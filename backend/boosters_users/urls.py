from django.urls import path
from .views import BoosterUserCreateView, UserBoostersView, BoosterUsersView, SpecificUserBoosterView

urlpatterns = [
    path('booster/user/', BoosterUserCreateView.as_view(), name='booster_user-create'),
    path('user/<int:user_id>/boosters/', UserBoostersView.as_view(), name='user-boosters'),
    path('booster/<int:booster_id>/users/', BoosterUsersView.as_view(), name='booster-users'),
    path('user/<int:user_id>/booster/<int:booster_id>/', SpecificUserBoosterView.as_view(), name='specific-user-booster'),
]
