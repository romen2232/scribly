from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *



urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('task/<int:pk>/', TaskRetrieveUpdateDeleteView.as_view(), name='task-retrieve-update-delete'),
    path('tasks/import/', TaskImportView.as_view(), name='task-import'),

]
