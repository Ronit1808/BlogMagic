from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings
from .serializers import BlogPostRequestSerializer
from rest_framework import status
from .models import BlogPostRequest

genai.configure(api_key=settings.GEMINI_API_KEY)


def generate_blog_content_with_genai(topic, tone, length):
    """
    Generate blog content using the Google Generative AI API.

    Args:
        topic (str): The topic for the blog post.
        tone (str): The tone of the blog post (e.g., friendly, professional).
        length (str): The desired length of the blog post (e.g., short, medium, long).

    Returns:
        str: The generated content or an error message.
    """
    try:
        # Create a detailed prompt incorporating tone and length
        detailed_prompt = (
            f"Write a {tone}, {length} blog post on the topic: {topic}. "
            "Make it engaging, informative, and well-structured."
        )

        # Use the Generative AI model
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(detailed_prompt)

        # Extract and return the generated text
        return response.text if response else "No content generated."
    except Exception as e:
        return f"An error occurred while generating content: {str(e)}"
    
    


class CreateBlogPostView(APIView):
    def post(self, request):
        serializer = BlogPostRequestSerializer(data=request.data)

        if serializer.is_valid():
            topic = serializer.validated_data.get('topic')
            tone = serializer.validated_data.get('tone', 'friendly')
            length = serializer.validated_data.get('length', 'medium')
            content_method = serializer.validated_data.get('content_method')
            content = serializer.validated_data.get('content', None)

            # Generate content if method is 'ai'
            if content_method == 'ai':
                content = generate_blog_content_with_genai(topic, tone, length)

            # Save the blog post
            blog_post = BlogPostRequest.objects.create(
                user=request.user if request.user.is_authenticated else None,  # Save user if available
                topic=topic,
                tone=tone,
                length=length,
                content_method=content_method,
                content=content,
                status='completed' if content else 'failed'
            )

            # Return response
            response_data = {
                "id": blog_post.id,
                "topic": blog_post.topic,
                "slug": blog_post.slug,
                "tone": blog_post.tone,
                "length": blog_post.length,
                "content_method": blog_post.content_method,
                "content": blog_post.content,
                "status": blog_post.status,
                "created_at": blog_post.created_at,
                "updated_at": blog_post.updated_at,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BlogTestAPIView(APIView):
    def get(self, request):
        return Response({"message": "Blog app API with DRF is working!"})