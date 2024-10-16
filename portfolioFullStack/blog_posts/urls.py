from django.urls import path
from . import views

urlpatterns = [
    path('api/blog/', views.get_blog_posts),
    path('api/blog/comment/<int:post_id>/', views.add_comment),
    path('api/blog/create/', views.create_blog_post),
    path('api/blog/comments/', views.get_comment_posts),
]
