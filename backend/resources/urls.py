from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ResourcesViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'resources', ResourcesViewSet, basename='resources')

urlpatterns = [
]
