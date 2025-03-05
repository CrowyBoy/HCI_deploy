from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.PostView.as_view(), name="posts-list"),
    path("uploader/<int:pk>/", views.UploaderView.as_view(), name="uploader-get"),
    path("posts/<int:posterid>/", views.PostViewFilter.as_view(), name="post-filter"),
    path("follow/create/<int:pk>/", views.FollowCreateView.as_view(), name="follow-create"),
    path("follow/delete/<int:pk>/", views.FollowDeleteView.as_view(), name="follow-delete"),
    path("follow/retrive/<int:pk>/", views.FollowRetriveView.as_view(), name="follow-retrive")
]
