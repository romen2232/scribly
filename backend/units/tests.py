from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Unit

class UnitTests(APITestCase):
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

        # create a unit
        self.unit = Unit.objects.create(unit_name='Test Unit', unit_description='Test Description')

    def test_create_unit(self):
        url = reverse('unit-list-create')
        data = {'unit_name': 'Test Unit 2', 'unit_description': 'Test Description 2'}
        response = self.client.post(url, data, format='json')
        print(response.status_code)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['unit_name'], 'Test Unit 2')
        self.assertEqual(response.data['unit_description'], 'Test Description 2')

    def test_get_units(self):
        url = reverse('unit-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['unit_name'], 'Test Unit')

    def test_get_single_unit(self):
        url = reverse('unit-retrieve-update-delete', args=[self.unit.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['unit_name'], 'Test Unit')

    def test_update_unit(self):
        url = reverse('unit-retrieve-update-delete', args=[self.unit.id])
        data = {'unit_name': 'Test Unit Updated', 'unit_description': 'Test Description Updated'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['unit_name'], 'Test Unit Updated')

    def test_delete_unit(self):
        url = reverse('unit-retrieve-update-delete', args=[self.unit.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Unit.objects.all()), 0)
