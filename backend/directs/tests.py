from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Directs

class DirectTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create users
        self.sender = get_user_model().objects.create_user(
            email='sender@test.com',
            password='testpassword',
            is_active=True
        )
        self.receiver = get_user_model().objects.create_user(
            email='receiver@test.com',
            password='testpassword',
            is_active=True
        )

        # Obtain a JWT token for the sender
        response = self.client.post(reverse('token_obtain_pair'), 
                                    {'email': 'sender@test.com', 'password': 'testpassword'}, 
                                    format='json')
        token = response.data['access']
        # Authenticate the sender
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

        # Create a direct
        self.direct = Directs.objects.create(sender=self.sender, receiver=self.receiver, message="Hello")

    def test_post_direct(self):
        url = reverse('direct-create')
        data = {'sender': self.sender.id, 'receiver': self.receiver.id, 'message': 'Test message'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['message'], 'Test message')

    def test_get_conversation(self):
        url = reverse('conversation', args=[self.sender.id, self.receiver.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['message'], 'Hello')

    def test_delete_direct(self):
        url = reverse('direct-delete', args=[self.direct.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Directs.objects.count(), 0)
