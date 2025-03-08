from django.db import models
from django.contrib.auth.models import User

class Uploader(models.Model):
    username = models.CharField(max_length=50)
    pfp = models.CharField(max_length=20)
    def __str__(self):
        return f"username={self.username},pfp={self.pfp}"

class Post(models.Model):
    posterid = models.ForeignKey(Uploader, on_delete=models.CASCADE)
    content = models.CharField(max_length=50)
    def __str__(self):
        return f"posterid={self.posterid}, content={self.content}"

class UserLikes(models.Model):
    postid = models.ForeignKey(Post, on_delete=models.CASCADE)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)

class UserFollows(models.Model):
    uploaderid = models.ForeignKey(Uploader, on_delete=models.CASCADE)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return f"uploaderid: {self.uploaderid} userid: {self.userid}"
    
class UserPrefrences(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fluffy_val = models.PositiveSmallIntegerField()
    majestic_val = models.PositiveSmallIntegerField()
    funny_val = models.PositiveSmallIntegerField()
    outfit_val = models.PositiveSmallIntegerField()
    def __str__(self):
        return f"user: {self.user}, fluffy_val: {self.fluffy_val}, majestic_val: {self.majestic_val}, funny_val: {self.funny_val}, outfit_val: {self.outfit_val}"
    

class UploaderTags(models.Model):
    uploader = models.ForeignKey(Uploader, on_delete=models.CASCADE)
    fluffy = models.BooleanField()
    majestic = models.BooleanField()
    funny = models.BooleanField()
    outfit = models.BooleanField()
# Create your models here.