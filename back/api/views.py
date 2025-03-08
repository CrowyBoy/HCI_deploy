from django.shortcuts import render
from django.contrib.auth.models import User
from django.views.generic.list import ListView
from rest_framework import generics
from .serializers import UserSerializer, PostSerializer, UploaderSerializer, UserFollowsSerializer, UserLikesSerializer, UserPrefrencesSerializer, UploaderTagsSerializer
from .models import Post, Uploader, UserLikes, UserFollows, UserPrefrences, UploaderTags
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
        user = self.request.user
        userPrefs = UserPrefrences.objects.filter(user=user)
        userFollows =list(UserFollows.objects.filter(userid=user))
        if not userFollows:
            if not userPrefs:
                items = list(Post.objects.all())
                FinalPost = random.sample(items,2)
                return FinalPost
            else:
                fluffy_accs =list(UploaderTags.objects.filter(fluffy=True))
                majestic_accs =list(UploaderTags.objects.filter(majestic=True))
                funny_accs =list(UploaderTags.objects.filter(funny=True))
                outfit_accs =list(UploaderTags.objects.filter(outfit=True))
                allposts=[]
                for array in [fluffy_accs,majestic_accs,funny_accs,outfit_accs]:
                    interlist=[]
                    for element in array:
                        interlist.extend(list(Post.objects.filter(posterid=element.uploader)))
                    allposts.append(interlist)
                allposts1d = random.sample(allposts[0],userPrefs.first().fluffy_val) + random.sample(allposts[1],userPrefs.first().majestic_val) + random.sample(allposts[2],userPrefs.first().funny_val) + random.sample(allposts[3],userPrefs.first().outfit_val)
                FinalPost = random.sample(allposts1d,2)
                return FinalPost
        else:
            followPosts=[]
            for follow in userFollows:
                followPosts.extend(list(Post.objects.filter(posterid=follow.uploaderid)))
            if not userPrefs:
                items = list(Post.objects.all())
                items = items + random.sample(followPosts,4)
                FinalPost = random.sample(items,2)
                return FinalPost
            else:
                fluffy_accs =list(UploaderTags.objects.filter(fluffy=True))
                majestic_accs =list(UploaderTags.objects.filter(majestic=True))
                funny_accs =list(UploaderTags.objects.filter(funny=True))
                outfit_accs =list(UploaderTags.objects.filter(outfit=True))
                allposts=[]
                for array in [fluffy_accs,majestic_accs,funny_accs,outfit_accs]:
                    interlist=[]
                    for element in array:
                        interlist.extend(list(Post.objects.filter(posterid=element.uploader)))
                    allposts.append(interlist)
                allposts1d = random.sample(allposts[0],userPrefs.first().fluffy_val) + random.sample(allposts[1],userPrefs.first().majestic_val) + random.sample(allposts[2],userPrefs.first().funny_val) + random.sample(allposts[3],userPrefs.first().outfit_val)
                allposts1d = allposts1d + random.sample(followPosts,4)
                FinalPost = random.sample(allposts1d,2)
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
    
class UserPrefrencesCreateView(generics.CreateAPIView):
    model = UserPrefrences
    serializer_class = UserPrefrencesSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        if serializer.is_valid():
            user=User.objects.get(username=self.request.user)
            serializer.save(user=user)
        else:
            print(serializer.errors)

class UserPrefrencesUpdateView(generics.UpdateAPIView):
    serializer_class = UserPrefrencesSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return UserPrefrences.objects.filter(user=self.request.user)
    def get_object(self):
        return self.get_queryset().get()
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

class UserPrefrencesRetriveView(generics.ListAPIView):
    serializer_class = UserPrefrencesSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return UserPrefrences.objects.filter(user=self.request.user)
    
class UploaderTagsView(generics.ListAPIView):
    model = UploaderTags
    serializer_class = UploaderTagsSerializer
    permission_classes = [IsAuthenticated]
    queryset = UploaderTags.objects.all()