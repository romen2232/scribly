from django.urls import path
from .views import *

urlpatterns = [
    path('units/', UnitListCreateView.as_view(), name='unit-list-create'),
    path('unit/<int:pk>/', UnitRetrieveUpdateDeleteView.as_view(), name='unit-retrieve-update-delete'),

    path('lessons/unit/<int:pk>/', UnitRetrieveCompletedView.as_view(), name='unit-retrieve-update-delete'),
    path('lessons/unit/percentages/<int:pk>/', UnitRetrievePercentagesView.as_view(), name='unit-retrieve-update-delete'),
    path('units/<str:category>/', UnitRetrieveByCategoryView.as_view(), name='unit-retrieve-by-category'),

]
