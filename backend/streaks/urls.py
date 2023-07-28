from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import StreaksViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'streaks', StreaksViewSet, basename='streaks')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
