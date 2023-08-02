from django.urls import path
from .views import EscriblyListCreateView, EscriblyRetrieveUpdateDeleteView

urlpatterns = [
    path('escriblys/', EscriblyListCreateView.as_view(), name='escribly-list-create'),
    path('escribly/<int:pk>/', EscriblyRetrieveUpdateDeleteView.as_view(), name='escribly-retrieve-update-delete')
]
