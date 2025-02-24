from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, PostSerializer, UploaderSerializer, UserFollowsSerializer, UserLikesSerializer
from .models import Post, Uploader, UserLikes, UserFollows
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreatePostView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Post.objects.all()
    def makePost(self, serilaizer):
        if serilaizer.is_valid():
            serilaizer.save()
        else:
            print(serilaizer.errors)

class DeletePostView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return 
    
class CreateUploder(generics.CreateAPIView):
    queryset = Uploader.objects.all()
    serializer_class = UploaderSerializer
    permission_classes = [IsAuthenticated]

class CreateUserFollow(generics.CreateAPIView):
    queryset = UserFollows.objects.all()
    serializer_class = UserFollowsSerializer
    permission_classes = [IsAuthenticated]
    def makeFollow (self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class DeleteUserFollow(generics.DestroyAPIView):
    serializer_class = UserFollowsSerializer
    permission_classes = [IsAuthenticated]

class CreateUserLike(generics.CreateAPIView):
    queryset = UserLikes.objects.all()
    serializer_class = UserLikesSerializer
    permission_classes = [IsAuthenticated]
    def makeLike(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class DeleteUserLike(generics.CreateAPIView):
    serializer_class = UserLikesSerializer
    permission_classes=[IsAuthenticated]

# Create your views here.
