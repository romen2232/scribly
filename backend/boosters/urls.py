from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import BoostersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'boosters', BoostersViewSet, basename='boosters')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
