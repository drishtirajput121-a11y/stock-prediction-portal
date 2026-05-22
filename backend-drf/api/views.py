from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .services import get_stock_prediction, batch_stock_prices

class StockPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        ticker = request.data.get('ticker')
        if not ticker:
            return Response({'error': 'Ticker symbol is required'}, status=400)
            
        result = get_stock_prediction(ticker)
        
        if "error" in result:
            return Response({'error': result['error']}, status=400)
            
        return Response(result)


class BatchPriceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        tickers = request.data.get('tickers', [])
        if not tickers or not isinstance(tickers, list):
            return Response({'error': 'Provide a list of tickers'}, status=400)
        
        result = batch_stock_prices(tickers)
        return Response(result)
