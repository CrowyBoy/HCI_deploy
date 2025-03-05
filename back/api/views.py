from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.generic.list import ListView
from rest_framework import generics
from .serializers import UserSerializer, PostSerializer, UploaderSerializer, UserFollowsSerializer, UserLikesSerializer
from .models import Post, Uploader, UserLikes, UserFollows
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
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
        return FinalPost
class UploaderView(generics.RetrieveAPIView):
    model = Uploader
    lookup_field = "pk"
    serializer_class = UploaderSerializer
    queryset=Uploader.objects.all()

class PostViewFilter(generics.ListAPIView):
    model = Post
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'posterid'    
    def get_queryset(self):
        posterid = self.kwargs.get('posterid')
        return Post.objects.filter(posterid=posterid)
class FollowCreateView(generics.CreateAPIView):
    model = UserFollows
    serializer_class = UserFollowsSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        uploaderid = Uploader.objects.get(id=self.kwargs.get("pk"))
        userid = User.objects.get(username=self.request.user)
        follow = UserFollows(uploaderid=uploaderid, userid=userid)
        follow.save()

class FollowDeleteView(generics.DestroyAPIView):
    model = UserFollows
    serializer_class = UserFollowsSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    def get_object(self):
        print("here")
        uploaderid = Uploader.objects.get(id=self.kwargs.get("pk"))
        print(uploaderid)
        userid = self.request.user
        print(userid)
        return get_object_or_404(UserFollows, uploaderid=uploaderid, userid=userid)
    
class FollowRetriveView(generics.ListAPIView):
    model = UserFollows
    serializer_class = UserFollowsSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        uploaderid = self.kwargs.get("pk")
        userid = self.request.user
        uploader = Uploader.objects.filter(id=uploaderid)
        user = User.objects.filter(username=userid)
        return UserFollows.objects.filter(uploaderid__id__in=uploader, userid__id__in=user)