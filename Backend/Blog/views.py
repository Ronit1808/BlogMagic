from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings
from .serializers import BlogPostRequestSerializer
from rest_framework import status

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
            topic = request.data.get('topic')
            tone = request.data.get('tone', 'neutral')  # Default to 'neutral' if not provided
            length = request.data.get('length', 'medium')  # Default to 'medium' if not provided
            content_method = request.data.get('content_method')

            # Use AI to generate content if the method is 'ai'
            if content_method == 'ai':
                generated_content = generate_blog_content_with_genai(topic, tone, length)
                serializer.validated_data['content'] = generated_content

            # Save the blog post with the generated content
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class BlogTestAPIView(APIView):
    def get(self, request):
        return Response({"message": "Blog app API with DRF is working!"})