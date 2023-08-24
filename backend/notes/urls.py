from django.urls import path
from .views import *

urlpatterns = [
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('note/<int:pk>/', NoteRetrieveUpdateDeleteView.as_view(), name='note-retrieve-update-delete'),
    path('users/notes/', NotesList.as_view(), name='note-list'),
    path('users/notes/folder/<int:folder_id>/', NoteListByFolder.as_view(), name='note-list-by-folder'),
    path('users/notes/tag/<int:tag_id>/', NoteListByTag.as_view(), name='note-list-by-tag'),
    path('users/notes/challenge/<int:challenge_id>/', NoteListByChallenge.as_view(), name='note-list-by-challenge'),
    path('users/notes/task/<int:task_id>/', NoteListByTask.as_view(), name='note-list-by-task'),
    path('users/notes/public', PublicNoteList.as_view(), name='public-note-list'),
    path('users/notes/public/<int:user_id>/', PublicNoteListByUser.as_view(), name='public-note-list-by-user'),
    path('users/notes/public/<str:username>/', PublicNoteListByUsername.as_view(), name='public-note-list-by-username'),
    
]
