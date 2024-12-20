from rest_framework import serializers
from .models import UserProfile , BlogPostRequest
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()  # Nested serializer for profile data

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'profile']
        

class BlogPostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostRequest
        fields = ['id', 'user', 'topic', 'slug', 'tone', 'length',
            'content_method', 'content', 'status', 'created_at', 'updated_at']
        
        read_only_fields = ['id', 'slug', 'status', 'created_at', 'updated_at']
