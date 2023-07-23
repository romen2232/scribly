from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import FoldersViewSet

router = DefaultRouter()
router.register(r'folders', FoldersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]