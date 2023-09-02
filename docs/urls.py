from django.urls import path
from .views import ScriblyListCreateView, ScriblyRetrieveUpdateDeleteView

urlpatterns = [
    path('scriblys/', ScriblyListCreateView.as_view(), name='scribly-list-create'),
    path('scribly/<int:pk>/', ScriblyRetrieveUpdateDeleteView.as_view(), name='scribly-retrieve-update-delete')
]
