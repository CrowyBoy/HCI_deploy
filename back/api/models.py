from django.db import models
from django.contrib.auth.models import User

class Uploader(models.Model):
    username = models.CharField(max_length=50)
    pfp = models.CharField(max_length=20)

class Post(models.Model):
    posterid = models.ForeignKey(Uploader, on_delete=models.CASCADE)
    content = models.CharField(max_length=20)

class UserLikes(models.Model):
    postid = models.ForeignKey(Post, on_delete=models.CASCADE)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)

class UserFollows(models.Model):
    uploaderid = models.ForeignKey(Uploader, on_delete=models.CASCADE)
    userid = models.ForeignKey(User, on_delete=models.CASCADE)
# Create your models here.