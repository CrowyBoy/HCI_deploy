from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.generic.list import ListView
from rest_framework import generics
from .serializers import UserSerializer, PostSerializer, UploaderSerializer, UserFollowsSerializer, UserLikesSerializer
from .models import Post, Uploader, UserLikes, UserFollows
from rest_framework.permissions import IsAuthenticated, AllowAny
import os
import random

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class PostView(generics.ListAPIView):
    model = Post
    serializer_class = PostSerializer
    premission_classes = [IsAuthenticated]
    #queryset = Post.objects.all()
    
    def get_queryset(self):
        items = list(Post.objects.all())
        FinalPost = random.sample(items,2)
        print(f"{FinalPost} is finalpost")
        return FinalPost
class UploaderView(generics.RetrieveAPIView):
    model = Uploader
    lookup_field = "pk"
    serializer_class = UploaderSerializer
    queryset=Uploader.objects.all()
    
