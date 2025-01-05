from rest_framework import serializers
from .models import UserProfile , BlogPostRequest
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['profile_picture', 'profile_picture_url', 'bio']

    def get_profile_picture_url(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url 
        return None


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
    user = UserSerializer(read_only=True)
    class Meta:
        model = BlogPostRequest
        fields = ['id', 'user', 'topic', 'slug', 'tone', 'length',
            'content_method', 'content', 'status', 'created_at', 'updated_at' , 'user']
        
        read_only_fields = ['id', 'slug', 'status', 'created_at', 'updated_at']
