from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import RatingsViewSet

router = DefaultRouter()
router.register(r'ratings', RatingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]