from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import LeaderboardsViewSet

router = DefaultRouter()
router.register(r'leaderboards', LeaderboardsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]