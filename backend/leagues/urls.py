from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import LeaguesViewSet

router = DefaultRouter()
router.register(r'leagues', LeaguesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]