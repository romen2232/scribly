import secrets

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

        first_name = validated_data.get('first_name', None)
        validated_data.pop('first_name')

        last_name = validated_data.get('last_name', None)
        validated_data.pop('last_name')

        user = User.objects.create_user(email=email, password=password, first_name=first_name,
                                        last_name=last_name, username=username, **validated_data)

        token = secrets.token_urlsafe(48)
        VerifyEmailToken.objects.create(user=user, token=token)

        print("Sending email to verify account")
        tasks.send_mail_to_verify_account(
            user_email=user.email, first_name=user.first_name, token=token)
        print("Email sent!")

        return user

    def validate(self, data):
        first_name = data['first_name']
        last_name = data['last_name']

        if not first_name.isalpha() or not last_name.isalpha():
            raise ValidationError(
                'First and last name should only contain letters!')

        return data


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
