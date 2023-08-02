from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import TiviViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'tivi', TiviViewSet, basename='tivi')

urlpatterns = [
]
