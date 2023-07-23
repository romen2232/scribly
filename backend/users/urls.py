from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import UsersViewSet

router = DefaultRouter()
router.register(r'users', UsersViewSet)

urlpatterns = [
    path('', include(router.urls)),
]