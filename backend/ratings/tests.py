# ratings/tests.py

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Ratings
from challenges.models import Challenges
from tasks.models import Tasks

class RatingsTests(APITestCase):
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

        # create a challenge
        self.challenge = Challenges.objects.create(challenge_name='testChallenge', challenge_description='testDescription', challenge_points=10, user=self.user)

        # create a task
        self.task = Tasks.objects.create(task_name='testTask', task_description='testDescription', task_points=10)

        # Create a rating for the challenge
        self.rating1 = Ratings.objects.create(user=self.user, rating=5, challenge=self.challenge)

        # Create a rating for the task
        self.rating2 = Ratings.objects.create(user=self.user, rating=4, task=self.task)

    def test_create_rating(self):
        url = reverse('ratings-list')
        data = {'user': self.user.id, 'rating': 3, 'challenge': self.challenge.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['rating'], 3)

    def test_get_all_ratings(self):
        url = reverse('ratings-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_get_user_ratings(self):
        url = reverse('user-ratings', args=[self.user.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_get_challenge_ratings(self):
        url = reverse('challenge-ratings', args=[self.challenge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_get_task_ratings(self):
        url = reverse('task-ratings', args=[self.task.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
    
    def test_get_challenge_rating(self):
        url = reverse('challenge-rating-detail', args=[self.user.id, self.challenge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['rating'], 5)

    def test_update_challenge_rating(self):
        url = reverse('challenge-rating-detail', kwargs={'user_id': self.user.id, 'challenge_id': self.challenge.id})
        data = {'rating': 3}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['rating'], 3)
        self.assertEqual(Ratings.objects.get(user=self.user, challenge=self.challenge).rating, 3)

    def test_delete_challenge_rating(self):
        url = reverse('challenge-rating-detail', args=[self.user.id, self.challenge.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)

    def test_get_task_rating(self):
        url = reverse('task-rating-detail', args=[self.user.id, self.task.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['rating'], 4)
    
    def test_update_task_rating(self):
        url = reverse('task-rating-detail', args=[self.user.id, self.task.id])
        data = {'rating': 6}
        response = self.client.patch(url, data, format='json')
        print(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['rating'], 6)

    def test_delete_task_rating(self):
        url = reverse('task-rating-detail', args=[self.user.id, self.task.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
