from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ResourcesViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'resources', ResourcesViewSet, basename='resources')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
