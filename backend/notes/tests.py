from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from .models import Notes

class NoteTests(APITestCase):
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

        # create a note
        self.note = Notes.objects.create(note_name='Test Note', 
                                         note_content='Test Content')

    def test_create_note(self):
        url = reverse('note-list-create')
        data = {'note_name': 'Test Note 2', 'note_content': 'Test Content 2'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['data']['note_name'], 'Test Note 2')

    def test_get_notes(self):
        url = reverse('note-list-create')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['note_name'], 'Test Note')

    def test_get_single_note(self):
        url = reverse('note-retrieve-update-delete', args=[self.note.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['note_name'], 'Test Note')

    def test_update_note(self):
        url = reverse('note-retrieve-update-delete', args=[self.note.id])
        data = {'note_name': 'Test Note Updated', 'note_content': 'Test Content Updated'}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['data']['note_name'], 'Test Note Updated')

    def test_delete_note(self):
        url = reverse('note-retrieve-update-delete', args=[self.note.id])
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(Notes.objects.all()), 0)
