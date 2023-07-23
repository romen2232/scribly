from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import NotesViewSet

router = DefaultRouter()
router.register(r'notes', NotesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]