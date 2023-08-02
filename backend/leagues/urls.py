from django.urls import path
from .views import LeagueListCreateView, LeagueRetrieveUpdateDeleteView

urlpatterns = [
    path('leagues/', LeagueListCreateView.as_view(), name='league-list-create'),
    path('league/<int:pk>/', LeagueRetrieveUpdateDeleteView.as_view(), name='league-retrieve-update-delete')
]
