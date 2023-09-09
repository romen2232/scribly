from django.urls import path
from .views import *

urlpatterns = [
    path('leaderboard/user/', LeaderboardUserCreateView.as_view(), name='leaderboard_user-create'),
    path('user/<int:user_id>/leaderboards/', UserLeaderboardsView.as_view(), name='user-leaderboards'),
    path('leaderboard/<int:leaderboard_id>/users/', LeaderboardUsersView.as_view(), name='leaderboard-users'),
    path('user/<int:user_id>/leaderboard/<int:leaderboard_id>/', SpecificUserLeaderboardView.as_view(), name='specific-user-leaderboard'),
    path('leaderboard/complete/<int:league_id>/', LeaderboardUserCompleteView.as_view(), name='leaderboard-user-complete')

]
