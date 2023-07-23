from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import LessonsViewSet

router = DefaultRouter()
router.register(r'lessons', LessonsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]