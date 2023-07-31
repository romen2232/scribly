from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Tasks_usersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'tasks_users', Tasks_usersViewSet, basename='tasks_users')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]