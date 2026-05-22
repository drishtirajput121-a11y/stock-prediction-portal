import yfinance as yf
import pandas as pd
import numpy as np
import requests
from sklearn.linear_model import LinearRegression
from datetime import datetime, timedelta

def get_ticker_symbol(query):
    """Attempt to resolve a company name to a stock ticker using Yahoo Finance search."""
    url = f"https://query2.finance.yahoo.com/v1/finance/search?q={query}"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    try:
        response = requests.get(url, headers=headers, timeout=5)
        if response.status_code == 200:
            data = response.json()
            quotes = data.get('quotes', [])
            if quotes:
                for quote in quotes:
                    if quote.get('quoteType') == 'EQUITY':
                        return quote.get('symbol')
                return quotes[0].get('symbol')
    except Exception as e:
        print("Error resolving ticker:", e)
    return query


def compute_recommendation(current_price, predicted_prices, historical_prices):
    """AI-based Buy/Sell/Hold recommendation with confidence and risk."""
    if not predicted_prices or not current_price:
        return {"signal": "HOLD", "confidence": 50, "risk": "Medium"}
    
    avg_predicted = np.mean([p['predicted_price'] for p in predicted_prices])
    pct_change = ((avg_predicted - current_price) / current_price) * 100
    
    # Compute volatility from recent historical prices (risk meter)
    recent_prices = [h['price'] for h in historical_prices[-30:]]
    if len(recent_prices) > 1:
        returns = np.diff(recent_prices) / recent_prices[:-1]
        volatility = np.std(returns) * 100
    else:
        volatility = 5.0
    
    # Determine risk level
    if volatility < 1.5:
        risk = "Low"
    elif volatility < 3.0:
        risk = "Medium"
    else:
        risk = "High"
    
    # Determine signal and confidence
    if pct_change > 5:
        signal = "BUY"
        confidence = min(95, 60 + pct_change * 2)
    elif pct_change < -5:
        signal = "SELL"
        confidence = min(95, 60 + abs(pct_change) * 2)
    else:
        signal = "HOLD"
        confidence = max(40, 70 - abs(pct_change) * 3)
    
    return {
        "signal": signal,
        "confidence": round(confidence, 1),
        "risk": risk,
        "predicted_change_pct": round(pct_change, 2),
    }


def compute_sentiment(historical_prices):
    """Compute market sentiment from recent price action."""
    if len(historical_prices) < 10:
        return {"sentiment": "Neutral", "label": "⚪", "score": 50}
    
    recent = [h['price'] for h in historical_prices[-20:]]
    older = [h['price'] for h in historical_prices[-40:-20]] if len(historical_prices) >= 40 else recent
    
    recent_avg = np.mean(recent)
    older_avg = np.mean(older)
    momentum = ((recent_avg - older_avg) / older_avg) * 100 if older_avg else 0
    
    # Short-term trend (last 5 days)
    short_trend = ((recent[-1] - recent[-5]) / recent[-5]) * 100 if len(recent) >= 5 else 0
    
    # Combine momentum and short-term trend
    score = 50 + momentum * 3 + short_trend * 2
    score = max(0, min(100, score))
    
    if score >= 65:
        return {"sentiment": "Bullish", "label": "🟢", "score": round(score)}
    elif score <= 35:
        return {"sentiment": "Bearish", "label": "🔴", "score": round(score)}
    else:
        return {"sentiment": "Neutral", "label": "⚪", "score": round(score)}


def get_stock_prediction(ticker_symbol, days_to_predict=30):
    try:
        # Resolve company name to ticker
        resolved_ticker = get_ticker_symbol(ticker_symbol)
        
        # Fetch historical data
        ticker = yf.Ticker(resolved_ticker)
        df = ticker.history(period="2y")
        
        if df.empty and resolved_ticker != ticker_symbol:
            # Fallback to original input just in case
            ticker = yf.Ticker(ticker_symbol)
            df = ticker.history(period="2y")
            resolved_ticker = ticker_symbol
            
        if df.empty:
            return {"error": f"Could not find stock data for '{ticker_symbol}'. Try using the official stock ticker symbol."}

        # Reset index to make Date a column
        df = df.reset_index()
        # Convert Date to string for JSON serialization later, but keep a datetime column for processing
        df['DateStr'] = df['Date'].dt.strftime('%Y-%m-%d')
        
        # Prepare historical data for frontend
        historical_data = []
        for _, row in df.iterrows():
            historical_data.append({
                "date": row['DateStr'],
                "price": round(row['Close'], 2)
            })
            
        # Prepare data for prediction
        # Use ordinal dates for linear regression
        df['DateOrdinal'] = df['Date'].map(pd.Timestamp.toordinal)
        
        X = df[['DateOrdinal']]
        y = df['Close']
        
        # Train Linear Regression model
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict future dates
        last_date = df['Date'].iloc[-1]
        future_dates = []
        future_ordinals = []
        
        for i in range(1, days_to_predict + 1):
            next_date = last_date + timedelta(days=i)
            # Skip weekends (simplified)
            if next_date.weekday() < 5:
                future_dates.append(next_date)
                future_ordinals.append([next_date.toordinal()])
                
        if not future_ordinals:
            return {"error": "Could not generate future dates"}
            
        # Make predictions
        predictions = model.predict(future_ordinals)
        
        predicted_data = []
        for i in range(len(future_dates)):
            predicted_data.append({
                "date": future_dates[i].strftime('%Y-%m-%d'),
                "predicted_price": round(predictions[i], 2)
            })
        
        current_price = historical_data[-1]['price'] if historical_data else None
        
        # Compute AI recommendation
        recommendation = compute_recommendation(current_price, predicted_data, historical_data)
        
        # Compute market sentiment
        sentiment = compute_sentiment(historical_data)
            
        return {
            "ticker": resolved_ticker.upper(),
            "original_query": ticker_symbol,
            "historical": historical_data,
            "prediction": predicted_data,
            "current_price": current_price,
            "recommendation": recommendation,
            "sentiment": sentiment,
        }
        
    except Exception as e:
        return {"error": str(e)}


def batch_stock_prices(tickers):
    """Get current prices for multiple tickers at once."""
    results = {}
    for symbol in tickers:
        try:
            resolved = get_ticker_symbol(symbol)
            t = yf.Ticker(resolved)
            hist = t.history(period="5d")
            if not hist.empty:
                current = round(hist['Close'].iloc[-1], 2)
                prev = round(hist['Close'].iloc[-2], 2) if len(hist) > 1 else current
                change_pct = round(((current - prev) / prev) * 100, 2) if prev else 0
                results[symbol.upper()] = {
                    "price": current,
                    "prev_close": prev,
                    "change_pct": change_pct,
                }
            else:
                results[symbol.upper()] = {"error": "No data"}
        except Exception as e:
            results[symbol.upper()] = {"error": str(e)}
    return results
