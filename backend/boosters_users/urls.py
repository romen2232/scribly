from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Boosters_usersViewSet

router = DefaultRouter()
router.register(r'boosters_users', Boosters_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]