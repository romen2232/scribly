from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Challenges_users
from challenges.models import Challenges

class ChallengeUserTests(APITestCase):
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

        self.challenge = Challenges.objects.create(challenge_name='testChallenge', challenge_description='test challenge', user=self.user)
        self.challenge_user = Challenges_users.objects.create(challenge=self.challenge, user=self.user)

    def test_assign_challenge_to_user(self):
        url = reverse('challenge_user-create')
        self.testChallenge = Challenges.objects.create(challenge_name='testChallenge2', challenge_description='test challenge', user=self.user)
        data = {'challenge': self.testChallenge.id, 'user': self.user.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['challenge'], self.testChallenge.id)
        self.assertEqual(response.data['user'], self.user.id)

    def test_get_challenges_for_user(self):
        url = reverse('user-challenges', args=[self.user.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['challenge'], self.challenge.id)
        self.assertEqual(response.data[0]['user'], self.user.id)

    def test_get_users_for_challenge(self):
        url = reverse('challenge-users', args=[self.challenge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['challenge'], self.challenge.id)
        self.assertEqual(response.data[0]['user'], self.user.id)

    def test_get_specific_user_challenge(self):
        url = reverse('specific-user-challenge', args=[self.user.id, self.challenge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['challenge'], self.challenge.id)
        self.assertEqual(response.data['user'], self.user.id)

    def test_delete_specific_user_challenge(self):
        url = reverse('specific-user-challenge', args=[self.user.id, self.challenge.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Challenges_users.objects.count(), 0)

