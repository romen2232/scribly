from django.urls import path
from .views import *

urlpatterns = [
    path('badges/', BadgeListCreateView.as_view(), name='badge-list-create'),
    path('badges/import/', ImportBadges.as_view(), name='badge-import'),
    path('badge/<int:pk>/', BadgeRetrieveUpdateDeleteView.as_view(), name='badge-retrieve-update-delete')
]
