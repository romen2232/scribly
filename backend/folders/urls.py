from django.urls import path
from .views import *

urlpatterns = [
    path('folders/', FoldersListCreateView.as_view(), name='folder-list-create'),
    path('folder/<int:pk>/', FoldersRetrieveUpdateDeleteView.as_view(), name='folder-retrieve-update-delete'),
    path('users/folders/', FolderList.as_view(), name='folder-list'),
    path('user/folder/<int:folder_id>/', FolderListRecursive.as_view(), name='get_folder_recursive'),
    path('user/folder/depth/<int:depth>',FolderListByDepth.as_view(), name='get_folder_by_depth'),
    path('user/folder/root',RootFolder.as_view(), name='get_folder_root'),
    
    ]
