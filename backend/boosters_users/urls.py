from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import Boosters_usersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'boosters_users', Boosters_usersViewSet, basename='boosters_users')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
