from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Folders

class FoldersTests(APITestCase):
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

        self.folder = Folders.objects.create(
            folder_name='Test Folder', 
            folder_description='Test Description',
            favorite=True,
            depth=1
        )

    def test_create_folder(self):
        url = reverse('folder-list-create')
        data = {
            'folder_name': 'Test Folder 2', 
            'folder_description': 'Test Description 2',
            'favorite': False,
            'depth': 2
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['folder_name'], 'Test Folder 2')

    def test_get_folders(self):
        url = reverse('folder-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['folder_name'], 'Test Folder')

    def test_get_single_folder(self):
        url = reverse('folder-retrieve-update-delete', args=[self.folder.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['folder_name'], 'Test Folder')

    def test_update_folder(self):
        url = reverse('folder-retrieve-update-delete', args=[self.folder.id])
        data = {
            'folder_name': 'Test Folder Updated', 
            'folder_description': 'Test Description Updated',
            'favorite': True,
            'depth': 3
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['folder_name'], 'Test Folder Updated')

    def test_delete_folder(self):
        url = reverse('folder-retrieve-update-delete', args=[self.folder.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Folders.objects.all()), 0)
