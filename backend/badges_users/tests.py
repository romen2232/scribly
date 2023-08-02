from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Badges_users
from badges.models import Badge

class BadgeUserTests(APITestCase):
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
        self.badge = Badge.objects.create(badge_name='testBadge', badge_image='badge_image.jpg', badge_description='test badge')
        self.badge_user = Badges_users.objects.create(badge=self.badge, user=self.user)

    def test_assign_badge_to_user(self):
        url = reverse('badge_user-create')
        self.testBadge= Badge.objects.create(badge_name='testBadge2', badge_image='badge_image.jpg', badge_description='test badge')
        data = {'badge': self.testBadge.id, 'user': self.user.id}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['badge'], self.testBadge.id)
        self.assertEqual(response.data['user'], self.user.id)


    def test_get_badges_for_user(self):
        url = reverse('user-badges', args=[self.user.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['badge'], self.badge.id)
        self.assertEqual(response.data[0]['user'], self.user.id)
        
        
    def test_get_users_for_badge(self):
        url = reverse('badge-users', args=[self.badge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['badge'], self.badge.id)
        self.assertEqual(response.data[0]['user'], self.user.id)

    def test_get_specific_user_badge(self):
        url = reverse('specific-user-badge', args=[self.user.id, self.badge.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['badge'], self.badge.id)
        self.assertEqual(response.data['user'], self.user.id)

    def test_delete_specific_user_badge(self):
        url = reverse('specific-user-badge', args=[self.user.id, self.badge.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Badges_users.objects.count(), 0)