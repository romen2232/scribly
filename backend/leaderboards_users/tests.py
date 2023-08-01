from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Leaderboards_users
from leaderboards.models import Leaderboards
from leagues.models import Leagues

class LeaderboardUserTests(APITestCase):
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
        self.league = Leagues.objects.create(league_name='testLeague', league_description='test league', league_image='test_image.jpg')

        # create a leaderboard
        self.leaderboard = Leaderboards.objects.create(league=self.league)

        # Create a leaderboard_user
        self.leaderboard_user = Leaderboards_users.objects.create(leaderboard=self.leaderboard, user=self.user)

    def test_create_leaderboard_user(self):
        url = reverse('leaderboard_user-create')
        data = {'leaderboard': self.leaderboard.id, 'user': self.user.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_get_user_leaderboards(self):
        url = reverse('user-leaderboards', args=[self.user.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_get_leaderboard_users(self):
        url = reverse('leaderboard-users', args=[self.leaderboard.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_update_specific_user_leaderboard(self):
        url = reverse('specific-user-leaderboard', args=[self.user.id, self.leaderboard.id])
        data = {'leaderboard_score': 100}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['leaderboard_score'], 100)

    def test_delete_specific_user_leaderboard(self):
        url = reverse('specific-user-leaderboard', args=[self.user.id, self.leaderboard.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)

    def test_get_non_existent_user_leaderboard(self):
        url = reverse('specific-user-leaderboard', args=[999, self.leaderboard.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 404)

    def test_patch_non_existent_user_leaderboard(self):
        url = reverse('specific-user-leaderboard', args=[999, self.leaderboard.id])
        data = {'leaderboard_score': 500}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, 404)
