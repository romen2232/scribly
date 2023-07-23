from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Clubs_usersViewSet

router = DefaultRouter()
router.register(r'clubs_users', Clubs_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]