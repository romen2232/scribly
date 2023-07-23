from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Challenges_usersViewSet

router = DefaultRouter()
router.register(r'challenges_users', Challenges_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]