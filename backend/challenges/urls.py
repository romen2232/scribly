from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ChallengesViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'challenges', ChallengesViewSet, basename='challenges')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
