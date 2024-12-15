from django.urls import path
from .views import BlogTestAPIView



urlpatterns = [
    path('Blog/test_endpoint/', BlogTestAPIView.as_view() , name='test_endpoint'),
]