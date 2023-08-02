from datetime import datetime
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Boosters_users
from boosters.models import Boosters

class BoosterUserTests(APITestCase):
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

        # create a booster
        self.booster = Boosters.objects.create(booster_name='testBooster', booster_image='booster_image.jpg', booster_description='test booster')
        self.booster_user = Boosters_users.objects.create(booster=self.booster, user=self.user)

    def test_assign_booster_to_user(self):
        url = reverse('booster_user-create')
        self.testBooster= Boosters.objects.create(booster_name='testBooster2', booster_image='booster_image.jpg', booster_description='test booster')
        data = {'booster': self.testBooster.id, 'user': self.user.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['booster'], self.testBooster.id)
        self.assertEqual(response.data['user'], self.user.id)

    def test_get_boosters_for_user(self):
        url = reverse('user-boosters', args=[self.user.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['booster'], self.booster.id)
        self.assertEqual(response.data[0]['user'], self.user.id)

    def test_get_users_for_booster(self):
        url = reverse('booster-users', args=[self.booster.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['booster'], self.booster.id)
        self.assertEqual(response.data[0]['user'], self.user.id)

    def test_get_specific_user_booster(self):
        url = reverse('specific-user-booster', args=[self.user.id, self.booster.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['booster'], self.booster.id)
        self.assertEqual(response.data['user'], self.user.id)

    def test_delete_specific_user_booster(self):
        url = reverse('specific-user-booster', args=[self.user.id, self.booster.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Boosters_users.objects.count(), 0)

    def test_update_specific_user_booster(self):
        url = reverse('specific-user-booster', args=[self.user.id, self.booster.id])
        date=datetime.now()
        data = { 'booster': self.booster.id, 'user': self.user.id, 'booster_end_date': date}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['booster'], self.booster.id)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['booster_end_date'], date.strftime("%Y-%m-%dT%H:%M:%S.%fZ"))

    def test_partial_update_specific_user_booster(self):
        url = reverse('specific-user-booster', args=[self.user.id, self.booster.id])
        data = {'booster_end_date': datetime.now()}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['booster'], self.booster.id)
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['booster_end_date'], data['booster_end_date'].strftime("%Y-%m-%dT%H:%M:%S.%fZ"))