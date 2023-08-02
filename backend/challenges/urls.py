from django.urls import path
from .views import ChallengesListCreateView, ChallengesRetrieveUpdateDeleteView

urlpatterns = [
    path('challenges/', ChallengesListCreateView.as_view(), name='challenge-list-create'),
    path('challenge/<int:pk>/', ChallengesRetrieveUpdateDeleteView.as_view(), name='challenge-retrieve-update-delete')
]
