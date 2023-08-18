from django.urls import path
from .views import *

urlpatterns = [
    path('task/user/', TaskUserCreateView.as_view(), name='task_user-create'),
    path('user/<int:user_id>/tasks/', UserTasksView.as_view(), name='user-tasks'),
    path('task/<int:task_id>/users/', TaskUsersView.as_view(), name='task-users'),
    path('user/<int:user_id>/task/<int:task_id>/', SpecificUserTaskView.as_view(), name='specific-user-task'),
]
