"""
Tests for the api alph-a-row POST method.
"""
import unittest
import json
from api import app


class FlaskAPITestCase(unittest.TestCase):

    """
    This class contains test cases for the Flask API endpoint /alph-a-row.
    """

    def setUp(self):
        """
        Set up the test client for the Flask application.
        """
        self.app = app.test_client()
        self.app.testing = True

    def test_even_streak(self):
        """
        Test case for an even streak in the input text.
        Input: 'aac'
        Expected output: streak='aac', streak_length=3
        """
        response = self.app.post(
            '/alph-a-row',
            data=json.dumps({'text': 'aac'}),
            content_type='application/json'
        )
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['streak'], 'aac')
        self.assertEqual(data['streak_length'], 3)

    def test_odd_streak(self):
        """
        Test case for an odd streak in the input text.
        Input: 'bbd'
        Expected output: streak='bbd', streak_length=3
        """
        response = self.app.post(
            '/alph-a-row',
            data=json.dumps({'text': 'ddf'}),
            content_type='application/json'
        )
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['streak'], 'ddf')
        self.assertEqual(data['streak_length'], 3)

    def test_mixed_streak(self):
        """
        Test case for a mixed streak in the input text.
        Input: 'aabcdefffc'
        Expected output: streak='fff', streak_length=3
        """
        response = self.app.post(
            '/alph-a-row',
            data=json.dumps({'text': 'aabcdefffc'}),
            content_type='application/json'
        )
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['streak'], 'fff')
        self.assertEqual(data['streak_length'], 3)

    def test_with_spaces(self):
        """
        Test case for streak with spaces in the input text.
        Input: 'a aa  a   adef'
        Expected output: streak='a aa  a   a', streak_length=5
        """
        response = self.app.post(
            '/alph-a-row',
            data=json.dumps({'text': 'a aa  a   adef'}),
            content_type='application/json'
        )
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['streak'], 'a aa  a   a')
        self.assertEqual(data['streak_length'], 5)

    def test_no_alpha_chars(self):
        """
        Test case for input with no alphabetic characters.
        Input: '12345'
        Expected output: streak='', streak_length=0
        """
        response = self.app.post(
            '/alph-a-row',
            data=json.dumps({'text': '12 34 5'}),
            content_type='application/json'
        )
        data = json.loads(response.get_data(as_text=True))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['streak'], '')
        self.assertEqual(data['streak_length'], 0)


if __name__ == '__main__':
    unittest.main()
