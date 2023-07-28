from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Badges_usersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'badges_users', Badges_usersViewSet, basename='badges-users')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
