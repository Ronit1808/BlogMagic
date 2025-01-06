from django.urls import path
from .views import SignupView , CreateBlogPostView , UserBlogsView , UpdateBlogPostView , SingleBlogView , DeleteBlogView , UserProfileView ,HealthCheckView



urlpatterns = [
    path('create/', CreateBlogPostView.as_view() , name='create'),
    path('signup/', SignupView.as_view() , name='signup'),
    path('blogs/', UserBlogsView.as_view() , name='blogs'),
    path('blogs/<slug:slug>/edit/', UpdateBlogPostView.as_view(), name='update_blog_post'),
    path('blogs/<slug:slug>/', SingleBlogView.as_view(), name='single_blog'),
    path('blogs/<slug:slug>/delete/', DeleteBlogView.as_view(), name='delete'),
    path('account/', UserProfileView.as_view(), name='account'),
    path('health_check/', HealthCheckView.as_view() , name='health_check'),
]