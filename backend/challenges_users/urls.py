from django.urls import path
from .views import *

urlpatterns = [
    path('challenge/user/', ChallengeUserCreateView.as_view(), name='challenge_user-create'),
    path('user/<int:user_id>/challenges/', UserChallengesView.as_view(), name='user-challenges'),
    path('challenge/<int:challenge_id>/users/', ChallengeUsersView.as_view(), name='challenge-users'),
    path('user/<int:user_id>/challenge/<int:challenge_id>/', SpecificUserChallengeView.as_view(), name='specific-user-challenge'),
    path('challenge/<int:challenge_id>/answer/' , AnswerChallengeView.as_view(), name='answer-challenge'),
]
