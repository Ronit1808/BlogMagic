import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_picture = models.ImageField(upload_to="profile_pictures/", null=True, blank=True)

    def __str__(self):
        return self.user.username
    

class BlogPostRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blog_requests", null=True, blank=True)
    topic = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)

    TONE_CHOICES = [
        ('formal', 'Formal'),
        ('informal', 'Informal'),
        ('friendly', 'Friendly'),
        ('professional', 'Professional'),
    ]
    tone = models.CharField(max_length=50, choices=TONE_CHOICES, default='friendly')

    LENGTH_CHOICES = [
        ('short', 'Short (up to 300 words)'),
        ('medium', 'Medium (300-700 words)'),
        ('long', 'Long (700+ words)'),
    ]
    length = models.CharField(max_length=50, choices=LENGTH_CHOICES, default='medium')

    CONTENT_METHOD_CHOICES = [
        ('ai', 'AI-Generated'),
        ('user', 'User-Created'),
    ]
    content_method = models.CharField(max_length=20, choices=CONTENT_METHOD_CHOICES, default='ai')

    content = models.TextField(null=True, blank=True)

    status = models.CharField(
        max_length=50,
        choices=[
            ('pending', 'Pending'),
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
        ],
        default='pending',
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    def save(self, *args, **kwargs):
        if not self.slug and self.topic:
            base_slug = slugify(self.topic)
            unique_suffix = str(uuid.uuid4())[:8]  
            self.slug = f"{base_slug}-{unique_suffix}"
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.topic} ({self.content_method})"
