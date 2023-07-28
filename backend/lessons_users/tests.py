from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import Lessons_users
from lessons.models import Lessons
from .serializers import Lessons_usersSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class LessonsUsersViewSetTestCase(APITestCase):
    """Test the LessonsUsersViewSet."""

    def setUp(self):
        self.client = APIClient()
        self.badge = Badge.objects.create(badge_name='Test badge', badge_description='This is a test badge')
        self.user = User.objects.create_user(username='testuser', password='testpass')
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

        self.lesson_data = {
            'lesson': 'Test lesson',
            'user': self.user.id,
            'lesson_start_date': '2023-07-24',
            'percentage_completed': 0
        }

        self.response = self.client.post(reverse('lessons-users-list'), self.lesson_data, format="json")
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_can_retrieve_lesson_user(self):
        lesson_user_id = self.response.data['id']
        response = self.client.get(reverse('lessons-users-detail', kwargs={'pk': lesson_user_id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_update_lesson_user(self):
        lesson_user_id = self.response.data['id']
        response = self.client.put(
            reverse('lessons-users-detail', kwargs={'pk': lesson_user_id}),
            {
                'lesson': 'Updated lesson',
                'user': self.user.id,
                'lesson_start_date': '2023-07-25',
                'percentage_completed': 50
            },
            format='json'
        )
        if response.status_code != status.HTTP_200_OK:
            print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class JWTAuthTestCase(APITestCase):
    """Test JWT authentication."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_can_obtain_token(self):
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'testuser', 'password': 'testpass'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_cannot_access_view_without_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='')
        response = self.client.get(reverse('lessons-users-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
