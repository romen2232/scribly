from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Lessons_usersViewSet

router = DefaultRouter()
router.register(r'lessons_users', Lessons_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]