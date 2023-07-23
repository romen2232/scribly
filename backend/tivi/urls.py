from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import TiviViewSet

router = DefaultRouter()
#router.register(r'tivi', TiviViewSet)

#urlpatterns = [
 #   path('', include(router.urls)),
#]