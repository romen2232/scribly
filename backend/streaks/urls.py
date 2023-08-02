from django.urls import path
from .views import StreakListCreateView, StreakRetrieveUpdateDeleteView

urlpatterns = [
    path('streaks/', StreakListCreateView.as_view(), name='streak-list-create'),
    path('streak/<int:pk>/', StreakRetrieveUpdateDeleteView.as_view(), name='streak-retrieve-update-delete')
]
