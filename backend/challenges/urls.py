from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ChallengesViewSet

router = DefaultRouter()
router.register(r'challenges', ChallengesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]