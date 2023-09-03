from django.urls import path
from .views import NoteRatingsView, RatingsListView, UserRatingsView, ChallengeRatingsView, TaskRatingsView, RatingDetailView

urlpatterns = [
    path('ratings/', RatingsListView.as_view(), name='ratings-list'),
    path('ratings/user/<int:user_id>/',
         UserRatingsView.as_view(), name='user-ratings'),
    path('ratings/challenge/<int:challenge_id>/',
         ChallengeRatingsView.as_view(), name='challenge-ratings'),
    path('ratings/task/<int:task_id>/',
         TaskRatingsView.as_view(), name='task-ratings'),
    path('ratings/note/',
         NoteRatingsView.as_view(), name='note-ratings'),
    path('ratings/user/<int:user_id>/challenge/<int:challenge_id>/',
         RatingDetailView.as_view(), name='challenge-rating-detail'),
    path('ratings/user/<int:user_id>/task/<int:task_id>/',
         RatingDetailView.as_view(), name='task-rating-detail'),
    path('ratings/user/<int:user_id>/note/<int:note_id>/',
         RatingDetailView.as_view(), name='lesson-rating-detail'),

]
