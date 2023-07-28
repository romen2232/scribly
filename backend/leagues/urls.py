from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import LeaguesViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'leagues', LeaguesViewSet, basename='leagues')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
