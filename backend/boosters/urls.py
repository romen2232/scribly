from django.urls import path
from .views import BoostersListCreateView, BoostersRetrieveUpdateDeleteView

urlpatterns = [
    path('boosters/', BoostersListCreateView.as_view(), name='booster-list-create'),
    path('booster/<int:pk>/', BoostersRetrieveUpdateDeleteView.as_view(), name='booster-retrieve-update-delete')
]
