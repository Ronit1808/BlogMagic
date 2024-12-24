from rest_framework import serializers
from .models import UserProfile , BlogPostRequest
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture' , 'bio']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer() 

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'profile']
        
    def update(self, instance, validated_data):
        # Extract profile data
        profile_data = validated_data.pop('profile', None)

        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update or create UserProfile
        if profile_data:
            profile, created = UserProfile.objects.get_or_create(user=instance)
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        return instance
        

class BlogPostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPostRequest
        fields = ['id', 'user', 'topic', 'slug', 'tone', 'length',
            'content_method', 'content', 'status', 'created_at', 'updated_at']
        
        read_only_fields = ['id', 'slug', 'status', 'created_at', 'updated_at']
