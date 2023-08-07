from secrets import token_urlsafe
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from users.serializers import *
from users.models import User, VerifyEmailToken, PasswordResetToken
from users import tasks


# Users views

class CreateUserView(CreateAPIView):
    """
    Receives the user's data and creates a new user.
    """
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.create(serializer.validated_data)
            data = dict(request.data)
            data.pop('password')

            return Response(data, status=status.HTTP_201_CREATED)
        
class UserViewSet(ModelViewSet):
    """
    Retrieves, updates or deletes one user instance.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        pk = self.request.user.id
        queryset = User.objects.all().filter(pk=pk)
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)

        return obj
    

class ListUserView(ListAPIView):
    """ 
    List all users
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        pk = self.request.user.id
        queryset = User.objects.all().filter(pk=pk)

        return queryset


@api_view(['POST'])
def activate_user_account(request):
    """ Receives a token sent by email the token will be pass as param, and if valid, activates the user's account """

    received_token = request.data.get('token', None)

    if received_token is None:
        return Response({"details": "Please, provide a token!"}, status=status.HTTP_400_BAD_REQUEST)

    token_exists = VerifyEmailToken.objects.all().filter(token=received_token).exists()
    if not token_exists:
        return Response({"details": "Token is invalid"}, status.HTTP_404_NOT_FOUND)

    token = VerifyEmailToken.objects.get(token=received_token)
    user = get_object_or_404(User, pk=token.user_id)
    user.is_active = True
    user.save()
    token.delete()

    return Response(data={"details": "User account activated!"}, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes((IsAuthenticated,))
def update_user(request):
    """ Used to update the user's personal data """

    pk = request.user.id
    user = get_object_or_404(User, pk=pk)
    serializer = UserUpdateSerializer(user, request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes((IsAuthenticated,))
def update_user_password(request):
    """ Receives the current password and the new password, and after confirming the current password, updates the user's password """

    pk = request.user.id
    user = get_object_or_404(User, pk=pk)
    actual_password = request.data.get('actual_password', None)
    new_password = request.data.get('new_password', None)

    if actual_password is None or new_password is None:
        return Response({"details": "Please, provide both current and new password!"}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(actual_password):
        return Response({"details": "Current password does not match!"}, status=status.HTTP_401_UNAUTHORIZED)

    user.set_password(new_password)
    user.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def forget_password(request):
    """ Receives an email and generates a token so the password can be recovered """

    email = request.data.get('email', None)

    if email is None:
        return Response({"details": "Please, provide the user's email"}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, email=email)

    if PasswordResetToken.objects.all().filter(user=user).exists():
        old_token = PasswordResetToken.objects.get(user=user)
        old_token.delete()

    token = token_urlsafe(64)
    PasswordResetToken.objects.create(user=user, token=token)

    tasks.send_mail_to_reset_user_password.delay(
        user_email=user.email, first_name=user.first_name, token=token)

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def reset_password(request):
    """ Receives a token and a new password to perform the reset """

    received_token = request.data.get('token', None)
    new_password = request.data.get('new_password', None)

    if received_token is None:
        return Response({"details": "Please, provide a token!"}, status=status.HTTP_400_BAD_REQUEST)

    if new_password is None:
        return Response({"details": "Please, provide a new password!"}, status=status.HTTP_400_BAD_REQUEST)

    if len(new_password) < 6:
        return Response({"details": "Password is invalid!"}, status=status.HTTP_400_BAD_REQUEST)

    token_exists = PasswordResetToken.objects.all().filter(
        token=received_token).exists()
    if not token_exists:
        return Response({"details": "Token is invalid"}, status.HTTP_404_NOT_FOUND)

    token = PasswordResetToken.objects.get(token=received_token)
    user = get_object_or_404(User, pk=token.user_id)
    user.set_password(new_password)
    user.save()
    token.delete()

    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def delete_user_account(request):
    pk = request.user.id
    user = get_object_or_404(User, pk=pk)
    user.delete()

    return Response(status=status.HTTP_200_OK)
