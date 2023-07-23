from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import FollowsViewSet

router = DefaultRouter()
router.register(r'follows', FollowsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]