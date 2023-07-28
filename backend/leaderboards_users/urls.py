from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Leaderboards_usersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'leaderboards_users', Leaderboards_usersViewSet, basename='leaderboards_users')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
