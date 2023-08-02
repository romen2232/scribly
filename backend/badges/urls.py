from django.urls import path
from .views import BadgeListCreateView, BadgeRetrieveUpdateDeleteView

urlpatterns = [
    path('badges/', BadgeListCreateView.as_view(), name='badge-list-create'),
    path('badge/<int:pk>/', BadgeRetrieveUpdateDeleteView.as_view(), name='badge-retrieve-update-delete')
]
