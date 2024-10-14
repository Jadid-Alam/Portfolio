from django.urls import path
from . import views

urlpatterns = [
    path('api/blog/', views.get_blog_posts),
    path('api/blog/comment/<int:post_id>/', views.add_comment),
]
