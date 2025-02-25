from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostView.as_view(), name="posts-list"),
    path("uploader/<int:pk>/", views.UploaderView.as_view(), name="uploader-get")
]
