from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import BadgesViewSet

router = DefaultRouter()
router.register(r'badges', BadgesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]