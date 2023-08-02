from django.urls import path
from .views import FoldersListCreateView, FoldersRetrieveUpdateDeleteView

urlpatterns = [
    path('folders/', FoldersListCreateView.as_view(), name='folder-list-create'),
    path('folder/<int:pk>/', FoldersRetrieveUpdateDeleteView.as_view(), name='folder-retrieve-update-delete')
]
