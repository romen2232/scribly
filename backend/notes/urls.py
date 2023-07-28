from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import NotesViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'notes', NotesViewSet, basename='notes')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
]
