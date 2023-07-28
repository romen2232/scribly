from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import BadgesViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'badges', BadgesViewSet, basename='badges')

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', include(router.urls)),
    # path('api/badges/', BadgeList.as_view(), name='badges-list'),
    # path('api/badges/<int:pk>/', BadgeDetail.as_view(), name='badges-detail'),
    # path('api/badges/create/', CreateBadge.as_view(), name='badges-create'),

]
