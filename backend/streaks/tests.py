from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Streaks

class StreakTests(APITestCase):
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

        # create a streak
        self.streak = Streaks.objects.create(user=self.user, streak=5)

    def test_create_streak(self):
        url = reverse('streak-list-create')
        data = {'user': self.user.id, 'streak': 7}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['streak'], 7)

    def test_get_streaks(self):
        url = reverse('streak-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['streak'], 5)

    def test_get_single_streak(self):
        url = reverse('streak-retrieve-update-delete', args=[self.streak.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['streak'], 5)

    def test_update_streak(self):
        url = reverse('streak-retrieve-update-delete', args=[self.streak.id])
        data = {'streak': 10}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['streak'], 10)

    def test_delete_streak(self):
        url = reverse('streak-retrieve-update-delete', args=[self.streak.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Streaks.objects.all()), 0)
