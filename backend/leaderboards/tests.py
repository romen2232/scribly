from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Leaderboards
from leagues.models import Leagues

class LeaderboardsTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='testuser',
            password='testpassword',
            is_active=True
        )
        response = self.client.post(reverse('token_obtain_pair'), 
                                    {'email': 'testuser', 'password': 'testpassword'}, 
                                    format='json')
        if 'access' in response.data:
            token = response.data['access']
            self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        else:
           for key in response.data:
               print(key, response.data[key])

        self.league = Leagues.objects.create(
            league_name='Test League', 
            league_description='Test Description'
        )
        
        self.leaderboard = Leaderboards.objects.create(league=self.league)

    def test_create_leaderboard(self):
        url = reverse('leaderboard-list-create')
        data = {
            'league': self.league.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_get_leaderboards(self):
        url = reverse('leaderboard-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['league'], self.league.id)    

    def test_get_single_leaderboard(self):
        url = reverse('leaderboard-retrieve-update-delete', args=[self.leaderboard.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['league'], self.league.id)

    def test_update_leaderboard(self):
        url = reverse('leaderboard-retrieve-update-delete', args=[self.leaderboard.id])
        new_league = Leagues.objects.create(
            league_name='Test League Updated', 
            league_description='Test Description Updated'
        )
        data = {
            'league': new_league.id
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['league'], new_league.id)

    def test_delete_leaderboard(self):
        url = reverse('leaderboard-retrieve-update-delete', args=[self.leaderboard.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Leaderboards.objects.all()), 0)
