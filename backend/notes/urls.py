from django.urls import path
from .views import NoteListCreateView, NoteRetrieveUpdateDeleteView

urlpatterns = [
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('note/<int:pk>/', NoteRetrieveUpdateDeleteView.as_view(), name='note-retrieve-update-delete')
]
