from datetime import datetime
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Follows

class FollowsTests(APITestCase):
    def setUp(self):
        self.client = APIClient()

        # Create users
        self.user1 = get_user_model().objects.create_user(
            email='testuser1',
            password='testpassword1',
            is_active=True
        )

        self.user2 = get_user_model().objects.create_user(
            email='testuser2',
            password='testpassword2',
            is_active=True
        )

        # Obtain a JWT token for the first user
        response = self.client.post(reverse('token_obtain_pair'), 
                                    {'email': 'testuser1', 'password': 'testpassword1'}, 
                                    format='json')
        if 'access' in response.data:
            token = response.data['access']
            # Authenticate the user
            self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        else:
           for key in response.data:
               print(key, response.data[key])

        # create a follow
        self.follow = Follows.objects.create(follower=self.user1, followed=self.user2)

    def test_create_follow(self):
        url = reverse('follow-list')
        user3 = get_user_model().objects.create_user(
            email='testuser3',
            password='testpassword3',
            is_active=True
        )
        data = {'follower': self.user1.id, 'followed': user3.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['follower'], self.user1.id)
        self.assertEqual(response.data['followed'], user3.id)

    def test_get_user_follows(self):
        url = reverse('following', args=[self.user1.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['follower'], self.user1.id)
        self.assertEqual(response.data[0]['followed'], self.user2.id)

    def test_get_followers(self):
        url = reverse('followers', args=[self.user2.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['follower'], self.user1.id)
        self.assertEqual(response.data[0]['followed'], self.user2.id)

    def test_get_follow_detail(self):
        url = reverse('follow-detail', args=[self.user1.id, self.user2.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['follower'], self.user1.id)
        self.assertEqual(response.data['followed'], self.user2.id)

    def test_delete_follow(self):
        url = reverse('unfollow', args=[self.user1.id, self.user2.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Follows.objects.count(), 0)

    def test_get_friends(self):
        # Make user2 follow user1
        Follows.objects.create(follower=self.user2, followed=self.user1)

        url = reverse('friends', args=[self.user1.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['follower'], self.user1.id)
        self.assertEqual(response.data[0]['followed'], self.user2.id)
