from django.urls import path
from .views import DirectCreateView, ConversationView, DirectDeleteView

urlpatterns = [
    path('direct/', DirectCreateView.as_view(), name='direct-create'),
    path('conversation/<int:sender_id>/<int:receiver_id>/', ConversationView.as_view(), name='conversation'),
    path('direct/<int:direct_id>/', DirectDeleteView.as_view(), name='direct-delete'),
]
