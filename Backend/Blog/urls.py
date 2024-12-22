from django.urls import path
from .views import SignupView , CreateBlogPostView , UserBlogsView



urlpatterns = [
    path('create/', CreateBlogPostView.as_view() , name='create'),
    path('signup/', SignupView.as_view() , name='signup'),
    path('blogs/', UserBlogsView.as_view() , name='blogs'),
]