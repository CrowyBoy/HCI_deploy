from django.test import TestCase
from .views import PostView
class TestCalls(TestCase):
    def test_post_get(self):
        print("hello there")
        view = PostView()
        view.get_queryset()
# Create your tests here.
