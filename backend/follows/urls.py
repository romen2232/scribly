from django.urls import path
from .views import FollowListView, FollowerView, FollowingView, FollowDetailView, UnfollowView, FriendsView, NotFollowingView

urlpatterns = [
    path('follows/', FollowListView.as_view(), name='follow-list'),
    path('follows/<int:user_id>/followers/',
         FollowerView.as_view(), name='followers'),
    path('follows/<int:user_id>/following/',
         FollowingView.as_view(), name='following'),
    path('follows/<int:follower_id>/follow/<int:followed_id>/',
         FollowDetailView.as_view(), name='follow-detail'),
    path('follows/<int:follower_id>/unfollow/<int:followed_id>/',
         UnfollowView.as_view(), name='unfollow'),
    path('friends/<int:user_id>/', FriendsView.as_view(), name='friends'),
    path('follows/notFollowing/<int:user_id>/',
         NotFollowingView.as_view(), name='not-following'),
]
