
from rest_framework.views import APIView
from rest_framework.response import Response
import google.generativeai as genai
from django.conf import settings
from .serializers import BlogPostRequestSerializer, UserSerializer ,UserProfileSerializer
from rest_framework import status
from .models import BlogPostRequest , User ,UserProfile 
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password
from rest_framework.generics import ListAPIView , RetrieveUpdateAPIView , RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.parsers import MultiPartParser, FormParser

genai.configure(api_key=settings.GEMINI_API_KEY)


def generate_blog_content_with_genai(topic, tone, length):
    try:
        
        detailed_prompt = (
            f"Write a {tone}, {length} blog post on the topic: {topic}. "
            "Make it engaging, informative, and well-structured. And don't add any special characters or emojis in the content."
        )

     
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(detailed_prompt)

       
        return response.text if response else "No content generated."
    except Exception as e:
        return f"An error occurred while generating content: {str(e)}"
    
    


class CreateBlogPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = BlogPostRequestSerializer(data=request.data)

        if serializer.is_valid():
            topic = serializer.validated_data.get('topic')
            tone = serializer.validated_data.get('tone', 'friendly')
            length = serializer.validated_data.get('length', 'medium')
            content_method = serializer.validated_data.get('content_method')
            content = serializer.validated_data.get('content', None)

            
            if content_method == 'ai':
                content = generate_blog_content_with_genai(topic, tone, length)

          
            blog_post = BlogPostRequest.objects.create(
                user=request.user if request.user.is_authenticated else None,  
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



class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

       
        if not username or not email or not password:
            raise ValidationError("All fields (username, email, password) are required.")
        if User.objects.filter(username=username).exists():
            raise ValidationError("A user with this username already exists.")
        if User.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")

        try:
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(password),  
            )
           
            UserProfile.objects.create(user=user)

            return Response(
                {"message": "User created successfully.", "username": user.username},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UserBlogsView(ListAPIView):
    queryset = BlogPostRequest.objects.all().order_by('-created_at') 
    serializer_class = BlogPostRequestSerializer
    permission_classes = [IsAuthenticated]

  
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]

    
    filterset_fields = {
        'tone': ['exact', 'in'],       
        'length': ['exact', 'in'], 
        'content_method' : ['exact' , 'in']
        
    }

    ordering_fields = ['created_at', 'updated_at']

   
    search_fields = ['topic', 'content']

    def get_queryset(self):
        return BlogPostRequest.objects.filter(user=self.request.user)
    
    
    
class UpdateBlogPostView(RetrieveUpdateAPIView):
    queryset = BlogPostRequest.objects.all()
    serializer_class = BlogPostRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "slug" 
    
    def get_queryset(self):
        return BlogPostRequest.objects.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        blog_post = self.get_object()

       
        if blog_post.user != request.user:
            raise PermissionDenied("You do not have permission to edit this blog post.")

        return super().update(request, *args, **kwargs)
    
class SingleBlogView(RetrieveAPIView):
    queryset = BlogPostRequest.objects.all()
    serializer_class = BlogPostRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "slug"  

    def get_queryset(self):
        return BlogPostRequest.objects.filter(user=self.request.user)
    
    

class DeleteBlogView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, slug):
        try:
            blog = BlogPostRequest.objects.get(slug=slug, user=request.user)
            blog.delete()
            return Response({"message": "Blog deleted successfully!"}, status=status.HTTP_200_OK)
        except BlogPostRequest.DoesNotExist:
            return Response(
                {"error": "Blog not found or you do not have permission to delete it."},
                status=status.HTTP_404_NOT_FOUND,
            )
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class HealthCheckView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"status": "ok"}, status=200)

    def head(self, request, *args, **kwargs):
        return Response(status=200)