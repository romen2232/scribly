from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ClubsViewSet

router = DefaultRouter()
router.register(r'clubs', ClubsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]