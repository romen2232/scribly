from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ResourcesViewSet

router = DefaultRouter()
router.register(r'resources', ResourcesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]