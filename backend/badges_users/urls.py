from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Badges_usersViewSet

router = DefaultRouter()
router.register(r'badges_users', Badges_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]