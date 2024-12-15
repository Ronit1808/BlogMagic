from django.contrib import admin
from .models import BlogPostRequest , UserProfile

admin.site.register([BlogPostRequest , UserProfile])
