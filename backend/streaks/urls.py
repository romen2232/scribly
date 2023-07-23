from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import StreaksViewSet

router = DefaultRouter()
router.register(r'streaks', StreaksViewSet)

urlpatterns = [
    path('', include(router.urls)),
]