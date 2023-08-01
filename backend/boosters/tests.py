from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Boosters

class BoostersTests(APITestCase):
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

        self.booster = Boosters.objects.create(booster_name='Test Booster', booster_description='Test Description', duration=10, multiplier=2)

    def test_create_booster(self):
        url = reverse('booster-list-create')
        data = {'booster_name': 'Test Booster 2', 'booster_description': 'Test Description 2', 'duration': 20, 'multiplier': 3}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['booster_name'], 'Test Booster 2')

    def test_get_boosters(self):
        url = reverse('booster-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['booster_name'], 'Test Booster')

    def test_get_single_booster(self):
        url = reverse('booster-retrieve-update-delete', args=[self.booster.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['booster_name'], 'Test Booster')

    def test_update_booster(self):
        url = reverse('booster-retrieve-update-delete', args=[self.booster.id])
        data = {'booster_name': 'Test Booster Updated', 'booster_description': 'Test Description Updated', 'duration': 30, 'multiplier': 4}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['booster_name'], 'Test Booster Updated')

    def test_delete_booster(self):
        url = reverse('booster-retrieve-update-delete', args=[self.booster.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Boosters.objects.all()), 0)
