from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *



urlpatterns = [
    
    path('lessons/', LessonListCreateView.as_view(), name='lesson-list-create'),
    path('lesson/<int:pk>/', LessonRetrieveUpdateDeleteView.as_view(), name='lesson-retrieve-update-delete'),
    path('lessons/import/', LessonImportView.as_view(), name='lesson-import'),
]
