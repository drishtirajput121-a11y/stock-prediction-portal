import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../axiosInstance';
import StockChart from './StockChart';
import AIRecommendation from './AIRecommendation';
import Watchlist from './Watchlist';
import PortfolioTracker from './PortfolioTracker';
import './Dashboard.css';

const Dashboard = () => {
    const [ticker, setTicker] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [stockData, setStockData] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const headingRef = useRef(null);
    const subtextRef = useRef(null);

    useEffect(() => {
        const heading = headingRef.current;
        const subtext = subtextRef.current;
        const text = 'Dashboard';
        let i = 0;
        let timeout;

        heading.textContent = '';
        heading.classList.remove('typing', 'done');
        subtext.classList.remove('visible');
        heading.classList.add('typing');

        function typeChar() {
            if (i < text.length) {
                heading.textContent += text[i++];
                timeout = setTimeout(typeChar, 80 + Math.random() * 40);
            } else {
                heading.classList.replace('typing', 'done');
                timeout = setTimeout(() => subtext?.classList.add('visible'), 300);
            }
        }

        typeChar();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axiosInstance.get('protected-view/');
                console.log("Auth Success:", response.data);
            } catch (error) {
                console.error('Error fetching auth data:', error);
            }
        };
        fetchInitialData();
    }, []);

    const handlePredict = async (e) => {
        if (e) e.preventDefault();
        if (!ticker) {
            setError('Please enter a stock ticker (e.g., AAPL)');
            return;
        }

        setLoading(true);
        setError('');
        setStockData(null);

        try {
            const response = await axiosInstance.post('predict/', { ticker });

            const combinedData = [
                ...response.data.historical,
                ...response.data.prediction
            ];

            setStockData({
                ticker: response.data.ticker,
                currentPrice: response.data.current_price,
                chartData: combinedData,
                recommendation: response.data.recommendation,
                sentiment: response.data.sentiment,
            });
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch prediction');
            console.error('Prediction Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredData = () => {
        if (!stockData) return null;
        let filtered = stockData.chartData;

        if (startDate) {
            filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
        }
        return filtered;
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <h2 ref={headingRef}></h2>
                <p ref={subtextRef}>
                    Enter a stock ticker symbol to see historical data, AI predictions, and market insights.
                </p>
            </div>

            {/* Prediction Form */}
            <form className="prediction-form" onSubmit={handlePredict}>
                {/* Row 1: Ticker input + Predict button */}
                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center w-100">                    <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    placeholder="Enter Ticker (e.g. MSFT, TSLA)"
                    className="ticker-input"
                />
                    <button type="submit" disabled={loading} className="predict-btn">
                        {loading ? 'Analyzing...' : 'Predict'}
                    </button>
                </div>

                {/* Row 2: Date range */}
                <div className="d-flex flex-row gap-2 align-items-center justify-content-center w-100 mt-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control bg-transparent text-light date-input"
                        title="Start Date"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', flex: '1 1 140px', maxWidth: '180px', minWidth: '0' }}
                    />
                    <span className="text-light align-self-center px-1">to</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control bg-transparent text-light date-input"
                        title="End Date"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', flex: '1 1 140px', maxWidth: '180px', minWidth: '0' }}
                    />
                </div>
            </form>

            {error && <div className="error-message">{error}</div>}

            {/* Main content grid */}
            <div className="row g-4 mt-2">

                {/* LEFT — Chart + Portfolio */}
                <div className="col-12 col-lg-8">
                    {stockData && (
                        <div className="results-container">
                            <div className="results-summary">
                                <h3>{stockData.ticker} Overview</h3>
                                <p className="current-price">
                                    Last Close Price: <strong>${stockData.currentPrice}</strong>
                                </p>
                            </div>
                            <div className="chart-wrapper">
                                <StockChart data={getFilteredData()} />
                            </div>
                        </div>
                    )}
                    &nbsp;
                    <PortfolioTracker />
                </div>

                {/* RIGHT — AI Recommendation + Watchlist */}
                <div className="col-12 col-lg-4 d-flex flex-column gap-4">
                    {stockData && (
                        <AIRecommendation
                            recommendation={stockData.recommendation}
                            sentiment={stockData.sentiment}
                        />
                    )}
                    <Watchlist onSelectTicker={(t) => {
                        setTicker(t);
                        setStockData(null);
                    }} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;