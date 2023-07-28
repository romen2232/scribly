from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Clubs_usersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'clubs_users', Clubs_usersViewSet, basename='clubs_users')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
