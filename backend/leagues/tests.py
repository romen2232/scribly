from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import Leagues
from .serializers import LeaguesSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class LeaguesViewSetTestCase(APITestCase):
    """Test the LeaguesViewSet."""

    def setUp(self):
        self.client = APIClient()
        self.leagues_data = {'field1': 'Test field1', 'field2': 'Test field2'}
        self.user = User.objects.create_user(username='testuser', password='testpass')
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        self.response = self.client.post(reverse('leagues-list'), self.leagues_data, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_can_retrieve_leagues(self):
        leagues_id = self.response.data['id']
        response = self.client.get(reverse('leagues-detail', kwargs={'pk': leagues_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_leagues(self):
        leagues_id = self.response.data['id']
        response = self.client.put(
            reverse('leagues-detail', kwargs={'pk': leagues_id}),
            {
                'field1': 'Updated field1',
                'field2': 'Updated field2'
            },
            format='json'
        )
        if response.status_code != status.HTTP_200_OK:
            print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class JWTAuthTestCase(APITestCase):
    """Test JWT authentication."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_can_obtain_token(self):
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testuser', 'password': 'testpass'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_cannot_access_view_without_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='')
        response = self.client.get(reverse('leagues-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
