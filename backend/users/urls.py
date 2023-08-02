from django.db import router
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers

from users.views import *


route = routers.DefaultRouter()

urlpatterns = [

    # Create user
    path('auth/register/', CreateUserView.as_view(), name='create_user'),

    # Activate user
    path('auth/activate/',
         activate_user_account, name='activate_user'),

    # List user data
    path('auth/me/', ListUserView.as_view(), name='list_user'),

    # Update user data
    path('auth/update/', update_user, name='update_user'),

    # Update user password
    path('auth/update/password/', update_user_password,
         name='update_user_password'),



    # Delete user account
    path('auth/delete/', delete_user_account, name='delete_user_account'),

    # Login
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Refresh token
    path('auth/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
