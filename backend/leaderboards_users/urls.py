from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Leaderboards_usersViewSet

router = DefaultRouter()
router.register(r'leaderboards_users', Leaderboards_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]