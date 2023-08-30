from django.urls import path
from .views import *


urlpatterns = [
    path('leaderboards/', LeaderboardsListCreateView.as_view(), name='leaderboard-list-create'),
    path('leaderboard/<int:pk>/', LeaderboardsRetrieveUpdateDeleteView.as_view(), name='leaderboard-retrieve-update-delete'),
    path('leaderboard/<int:league_id>/users/', LeaderboardUsers.as_view(), name='leaderboard-users'),
]
