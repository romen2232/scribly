from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Challenges

class ChallengesTests(APITestCase):
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

        self.challenge = Challenges.objects.create(
            challenge_name='Test Challenge', 
            challenge_description='Test Description', 
            challenge_style='Test Style', 
            difficulty=1, 
            challenge_points=100, 
            challenge_average_rating=5, 
            user=self.user
        )

    def test_create_challenge(self):
        url = reverse('challenge-list-create')
        data = {
            'challenge_name': 'Test Challenge 2', 
            'challenge_description': 'Test Description 2', 
            'challenge_style': 'Test Style 2', 
            'difficulty': 2, 
            'challenge_points': 200, 
            'challenge_average_rating': 4,
            'user': self.user.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['challenge_name'], 'Test Challenge 2')

    def test_get_challenges(self):
        url = reverse('challenge-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['challenge_name'], 'Test Challenge')

    def test_get_single_challenge(self):
        url = reverse('challenge-retrieve-update-delete', args=[self.challenge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['challenge_name'], 'Test Challenge')

    def test_update_challenge(self):
        url = reverse('challenge-retrieve-update-delete', args=[self.challenge.id])
        data = {
            'challenge_name': 'Test Challenge Updated', 
            'challenge_description': 'Test Description Updated', 
            'challenge_style': 'Test Style Updated', 
            'difficulty': 3, 
            'challenge_points': 300, 
            'challenge_average_rating': 3,
            'user': self.user.id
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['challenge_name'], 'Test Challenge Updated')

    def test_delete_challenge(self):
        url = reverse('challenge-retrieve-update-delete', args=[self.challenge.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Challenges.objects.all()), 0)
