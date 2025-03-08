from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, Uploader, UserLikes, UserFollows , UserPrefrences, UploaderTags
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id","posterid","content"]
        extra_kwargs = {"posterid":{"read_only":True}}

class UploaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Uploader
        fields = ["id","username","pfp"]

class UserLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLikes
        fields = ["id", "postid", "userid"]
        extra_kwargs = {"postid":{"read_only":True},"userid":{"read_only":True}}

class UserFollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollows
        fields = ["id","uploaderid","userid"]
        extra_kwargs = {"uploaderid":{"read_only":True},"userid":{"read_only":True}}

class UserPrefrencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPrefrences
        fields = ["id","user","fluffy_val","majestic_val","funny_val","outfit_val"]
        extra_kwargs = {"user":{"read_only":True}}

class UploaderTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploaderTags
        fields = ["id","uploader","fluffy","majestic","funny","outfit"]