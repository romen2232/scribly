from django.urls import path
from .views import BadgeUserCreateView, UserBadgesView, BadgeUsersView, SpecificUserBadgeView

urlpatterns = [
    path('badge/user/', BadgeUserCreateView.as_view(), name='badge_user-create'),
    path('user/<int:user_id>/badges/', UserBadgesView.as_view(), name='user-badges'),
    path('badge/<int:badge_id>/users/', BadgeUsersView.as_view(), name='badge-users'),
    path('user/<int:user_id>/badge/<int:badge_id>/', SpecificUserBadgeView.as_view(), name='specific-user-badge'),
]
