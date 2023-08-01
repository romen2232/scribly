from django.urls import path
from .views import LeaderboardsListCreateView, LeaderboardsRetrieveUpdateDeleteView

urlpatterns = [
    path('leaderboards/', LeaderboardsListCreateView.as_view(), name='leaderboard-list-create'),
    path('leaderboard/<int:pk>/', LeaderboardsRetrieveUpdateDeleteView.as_view(), name='leaderboard-retrieve-update-delete')
]
