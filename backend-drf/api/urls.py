from django.urls import path
from accounts import views as Userviews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import StockPredictionView, BatchPriceView

urlpatterns = [
    path('register/', Userviews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('protected-view/', Userviews.ProtectedView.as_view(), name='protected_view'),
    path('predict/', StockPredictionView.as_view(), name='stock_predict'),
    path('batch-prices/', BatchPriceView.as_view(), name='batch_prices'),
]
