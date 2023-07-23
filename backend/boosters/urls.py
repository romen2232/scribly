from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import BoostersViewSet

router = DefaultRouter()
router.register(r'boosters', BoostersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]