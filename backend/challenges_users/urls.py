from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Challenges_usersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'challenges_users', Challenges_usersViewSet, basename='challenges_users')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
