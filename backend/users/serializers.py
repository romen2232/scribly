import secrets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.db.models import Q
from django.contrib.auth import authenticate

from django.core.mail import send_mail
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import User, VerifyEmailToken
from users import tasks


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # ('id', 'first_name', 'last_name', 'email', 'birth_date',
        # 'phone_number', 'receive_future_promotional_emails', 'provide_data_to_improve_user_exp')#
        
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = "__all__"  
        exclude = ('password', 'is_superuser', 'is_staff', 'is_active', 'groups', 'user_permissions') 


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

        # ('id', 'email', 'password', 'first_name', 'last_name', 'birth_date', 'phone_number',
        # 'receive_future_promotional_emails', 'provide_data_to_improve_user_exp')

    def create(self, validated_data):
        """ Create a user, and also create a token for email verification """

        username = validated_data.get('username', None)
        validated_data.pop('username')

        email = validated_data.get('email', None)
        validated_data.pop('email')

        password = validated_data.get('password', None)
        validated_data.pop('password')

        user = User.objects.create_user(email=email, password=password, username=username, **validated_data)

        token = secrets.token_urlsafe(48)
        VerifyEmailToken.objects.create(user=user, token=token)

        print("Sending email to verify account")
        tasks.send_mail_to_verify_account(
            user_email=user.email, username=user.username, token=token)
        print("Email sent!")

        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'username', 'gems', 'experience', 'phone_number', 'appear_daily_challenge',
                  'receive_future_promotional_emails', 'provide_data_to_improve_user_exp')

    def validate(self, data):
        first_name = data.get('first_name', None)
        last_name = data.get('last_name', None)

        if first_name is not None:
            if not first_name.isalpha():
                raise ValidationError(
                    'First and last name should only contain letters!')

        if last_name is not None:
            if not last_name.isalpha():
                raise ValidationError(
                    'First and last name should only contain letters!')

        return data


from django.core.validators import validate_email
from django.core.exceptions import ValidationError


def validateEmail(email):
    try:
        validate_email(email)
        return True
    except ValidationError:
        return False


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token
    
    def validate(self, attrs):
        userName = attrs.get("email")
        password = attrs.get("password")

        # 

        if validateEmail(userName) is False:
            #check the input whether it is username or email
            #if it is username, then get the email of the user
            try:
                user = User.objects.get(username=userName)
                if user.check_password(password):
                    attrs['email'] = user.email
         

            except Users.DoesNotExist:
                raise exceptions.AuthenticationFailed(
                    'No such user with provided credentials'.title()) 
        
        data = super().validate(attrs)
        return data
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    # email = serializers.EmailField(required=False)
    # username = serializers.CharField(required=False)
    # password = serializers.CharField(write_only=True, required=True)

    # def validate(self, attrs):
    #     email = attrs.get('email')
    #     password = attrs.get('password')


    #     # Autenticar al usuario con el email y password proporcionados
    #     user = authenticate(email=email, password=password)
    #     if user is None:
    #         raise exceptions.AuthenticationFailed('No se pudo autenticar con las credenciales proporcionadas.')

    #     if not user.is_active:
    #         raise exceptions.AuthenticationFailed('El usuario no está activo.')

    #     # Establecemos el user en el objeto serializer para que pueda ser utilizado por la clase base
    #     self.user = user
    #     return super().validate(attrs)







    # def post(self, request, *args, **kwargs):
        
    #     username = request.data.get('username', required=False)
    #     email = request.data.get('email', requiered=False)
    #     password = request.data.get('password')

    #     # Si se proporciona un username pero no un email, intenta obtener el email asociado al username
    #     if username and not email:
    #         try:
    #             user = User.objects.get(username=username)
    #             email = user.email
    #         except User.DoesNotExist:
    #             return Response({"detail": "No se encontró un usuario con ese username."}, status=status.HTTP_401_UNAUTHORIZED)

    #     # Copia request.data a un nuevo diccionario y modifica el valor de 'email'
    #     data = request.data.copy()
    #     data['email'] = email

    #     # Autentica al usuario con el email y password proporcionados
    #     user = authenticate(email=email, password=password)
    #     if user:
    #         # Si la autenticación es exitosa, delega en la clase base para obtener los tokens
    #         return super().validate(data)
    #     else:
    #         return Response({"detail": "Credenciales no válidas."}, status=status.HTTP_401_UNAUTHORIZED)