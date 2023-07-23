from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import DirectsViewSet

router = DefaultRouter()
router.register(r'directs', DirectsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]