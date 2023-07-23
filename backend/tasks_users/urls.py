from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Tasks_usersViewSet

router = DefaultRouter()
router.register(r'tasks_users', Tasks_usersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]