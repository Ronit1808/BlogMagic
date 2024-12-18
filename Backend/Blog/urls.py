from django.urls import path
from .views import BlogTestAPIView , CreateBlogPostView



urlpatterns = [
    path('Blog/test_endpoint/', BlogTestAPIView.as_view() , name='test_endpoint'),
    path('create/', CreateBlogPostView.as_view() , name='create'),
]