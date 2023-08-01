from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Badge

class BadgeTests(APITestCase):
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

        # create a badge
        self.badge = Badge.objects.create(badge_name='Test Badge', badge_description='Test Description')

    def test_create_badge(self):
        url = reverse('badge-list-create')
        data = {'badge_name': 'Test Badge 2', 'badge_description': 'Test Description 2'}
        response = self.client.post(url, data, format='json')
        print(response.status_code)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['badge_name'], 'Test Badge 2')
        self.assertEqual(response.data['badge_description'], 'Test Description 2')

    def test_get_badges(self):
        url = reverse('badge-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['badge_name'], 'Test Badge')

    def test_get_single_badge(self):
        url = reverse('badge-retrieve-update-delete', args=[self.badge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['badge_name'], 'Test Badge')

    def test_update_badge(self):
        url = reverse('badge-retrieve-update-delete', args=[self.badge.id])
        data = {'badge_name': 'Test Badge Updated', 'badge_description': 'Test Description Updated'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['badge_name'], 'Test Badge Updated')

    def test_delete_badge(self):
        url = reverse('badge-retrieve-update-delete', args=[self.badge.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Badge.objects.all()), 0)
