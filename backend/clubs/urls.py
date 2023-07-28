from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ClubsViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'clubs', ClubsViewSet, basename='clubs')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
