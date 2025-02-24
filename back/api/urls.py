from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.CreatePostView.as_view(), name="posts-list"),
    path("posts/delete", views.DeletePostView.as_view(), name="post-delete"),
    path("uploader/", views.CreateUploder.as_view(), name="uploader-list"),
    path("likes/", views.CreateUserLike.as_view(), name="likes-list"),
    path("likes/delete", views.DeleteUserFollow.as_view(), name="like-delete"),
    path("follows/", views.CreateUserFollow.as_view(), name="follows-list"),
    path("follows/delete", views.DeleteUserFollow.as_view(), name="follow-delete")
]
