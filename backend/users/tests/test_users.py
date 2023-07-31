import json

from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User, VerifyEmailToken


class UsersTestCase(APITestCase):
    def setUp(self):
        self.create_user_url = '/api/v1/users/create/'
        self.activate_user_url = '/api/v1/users/activate/'
        self.user_data_url = '/api/v1/users/me/'
        self.update_user_url = '/api/v1/users/update/'
        self.update_user_password_url = '/api/v1/users/update/password/'
        self.forget_password_url = '/api/v1/users/forget-password/'
        self.reset_password_url = '/api/v1/users/reset-password/'
        self.delete_user_account = '/api/v1/users/delete/'

        user_data = {
            'username' : 'test_user',
            'email': 'test@testcase.com',
            'password': 'test123',
            'first_name': 'Test',
            'last_name': 'TestCase',
        }

        #self.client.post(self.create_user_url, data=user_data)
        response = self.client.post(self.create_user_url, data=user_data)
        #print(response.status_code)
        #print(response.content)

        self.user = User.objects.get(email='test@testcase.com')

    def test_create_a_new_user_from_api_route(self):
        """ Test to create a new user through the API route and check if the user's "is_active" is false """

        data = {
            'username' : 'testUsername',
            'email': 'user@testcase.com',
            'password': 'test123456',
            'first_name': 'User',
            'last_name': 'TestCase',
        }

        response = self.client.post(self.create_user_url, data=data)
        user = User.objects.get(pk=2)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertFalse(user.is_active)

    def test_activate_user_account(self):
        """ Test to activate the user account through the API route """

        token = self.user.verifyemailtoken.token
        data = {
            'token': token
        }
        response = self.client.post(self.activate_user_url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_data_without_authentication(self):
        """ Test that checks if an unauthenticated user can check their data, 
        should return a 401 unauthorized error """

        response = self.client.get(self.user_data_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_user_data(self):
        """ Test that checks if an authenticated user can view their data """

        expected_response_data = [{
            'id': self.user.id,
            #'password' : self.user.password,
            'last_login' : self.user.last_login,
            'is_superuser' : self.user.is_superuser,
            'username' : self.user.username,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email,
            'phone_number': self.user.phone_number,
            'experience' : self.user.experience,
            'gems' : self.user.gems,
            'appear_daily_challenge' : self.user.appear_daily_challenge,
            'receive_future_promotional_emails': self.user.receive_future_promotional_emails,
            'provide_data_to_improve_user_exp': self.user.provide_data_to_improve_user_exp,
            'is_staff' : self.user.is_staff,
            'is_active' : self.user.is_active,
            'date_joined' : self.user.date_joined.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'groups': list(self.user.groups.values_list('id', flat=True)),
            'user_permissions': list(self.user.user_permissions.values_list('id', flat=True)),
        }]

        self.client.force_authenticate(self.user)
        response = self.client.get(self.user_data_url)

        response_data = json.loads(response.content)
        for user_data in response_data:
            user_data.pop('password', None)
        #print(response_data)
        #print('\nOOOOO\n')
        #print(expected_response_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response_data, expected_response_data)

    def test_update_user_data_without_authentication(self):
        """ Test that checks if it is possible for a user to update their data (WITHOUT being authenticated), 
        should return a 401 unauthorized error """

        data = {
            'birth_date': '15/06/2001'
        }

        response = self.client.patch(self.update_user_url, data=data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_data(self):
        """ Test that checks if an authenticated user can update their data """

        data = {
            'birth_date': '15/06/2001'
        }

        self.client.force_authenticate(self.user)
        response = self.client.patch(self.update_user_url, data=data)
        
        print(response)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_user_password_without_authentication(self):
        """ Test that checks if a user can try to change the password (WITHOUT being authenticated), 
        should return a 401 unauthorized error """

        data = {
            'actual_password': 'test123',
            'new_password': '123456qwert'
        }

        response = self.client.patch(self.update_user_password_url, data=data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_password_with_old_password_wrong(self):
        """ Test to try to update the user's password, but passing the wrong current password,
        should return a 401 unauthorized error """

        data = {
            'actual_password': 'wrong_actual_password',
            'new_password': '123456qwert'
        }

        self.client.force_authenticate(self.user)
        response = self.client.patch(self.update_user_password_url, data=data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_user_password(self):
        """ Test that checks if an authenticated user can change their password """

        data = {
            'actual_password': 'test123',
            'new_password': '123456qwert'
        }

        self.client.force_authenticate(self.user)
        response = self.client.patch(self.update_user_password_url, data=data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
