from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Leagues

class LeagueTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create a user
        self.user = get_user_model().objects.create_user(
            email='testuser',
            password='testpassword',
            is_active=True
        )

        # Obtain a JWT token for the user
        response = self.client.post(reverse('token_obtain_pair'), 
                                    {'email': 'testuser', 'password': 'testpassword'}, 
                                    format='json')
        if 'access' in response.data:
            token = response.data['access']
            # Authenticate the user
            self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        else:
           for key in response.data:
               print(key, response.data[key])

        # create a league
        self.league = Leagues.objects.create(league_name='Test League', 
                                             league_description='Test Description')

    def test_create_league(self):
        url = reverse('league-list-create')
        data = {'league_name': 'Test League 2', 'league_description': 'Test Description 2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['league_name'], 'Test League 2')

    def test_get_leagues(self):
        url = reverse('league-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['league_name'], 'Test League')

    def test_get_single_league(self):
        url = reverse('league-retrieve-update-delete', args=[self.league.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['league_name'], 'Test League')

    def test_update_league(self):
        url = reverse('league-retrieve-update-delete', args=[self.league.id])
        data = {'league_name': 'Test League Updated', 'league_description': 'Test Description Updated'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['league_name'], 'Test League Updated')

    def test_delete_league(self):
        url = reverse('league-retrieve-update-delete', args=[self.league.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Leagues.objects.all()), 0)
