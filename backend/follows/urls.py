from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import FollowsViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'follows', FollowsViewSet, basename='follows')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
