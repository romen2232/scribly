from django.urls import path
from .views import *

urlpatterns = [
    path('task/user/', TaskUserCreateView.as_view(), name='task_user-create'),

    path('task/user/update/<int:user_id>/<int:task_id>/', TaskUserUpdateView.as_view(), name='task_user-update'),
    path('user/<int:user_id>/tasks/', UserTasksView.as_view(), name='user-tasks'),
    path('task/<int:task_id>/user/', TaskUsersView.as_view(), name='task-users'),
    path('user/<int:user_id>/task/<int:task_id>/', SpecificUserTaskView.as_view(), name='specific-user-task'),
    path('user/<int:user_id>/task/<int:task_id>/answer/', UpdateReponse.as_view(), name='specific-user-task-answer'),
    path('user/<int:user_id>/task/<int:task_id>/skip/', SkipTask.as_view(), name='specific-user-task-skip'),
    path('user/<int:user_id>/task/<int:task_id>/mark/', EvaluateText.as_view(), name='specific-user-task-answer'),

]
