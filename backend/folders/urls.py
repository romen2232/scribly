from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import FoldersViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'folders', FoldersViewSet, basename='folders')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
