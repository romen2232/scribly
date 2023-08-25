from django.urls import path
from .views import *

urlpatterns = [
    path('lesson/user/', LessonUserCreateView.as_view(), name='lesson_user-create'),
    path('user/<int:user_id>/lessons/', UserLessonsView.as_view(), name='user-lessons'),
    path('lesson/<int:lesson_id>/users/', LessonUsersView.as_view(), name='lesson-users'),
    path('user/<int:user_id>/lesson/<int:lesson_id>/', SpecificUserLessonView.as_view(), name='specific-user-lesson'),
    path('lesson-user/<int:pk>/', LessonUserRetrieveUpdateDeleteView.as_view(), name='lesson-user-retrieve-update-delete'),
         #SpecificUserLessonByIDView.as_view(), name='specific-user-lesson-id'),
    path('lesson/start/<int:lesson_id>/', LessonUserCreateOrUpdateView.as_view(), name='lesson_user_check_or_create'),
    path('user/lesson/<int:lesson_id>/', LessonUserRetrieveViewWithTaskUser.as_view(), name='lesson_user_retrieve'),

]
