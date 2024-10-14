from django.shortcuts import render
from .models import blog_posts
from django.http import JsonResponse
import datetime

# Create your views here.

def get_blog_posts(request):
    try:
        posts = list(blog_posts.find({}, {'_id': 0}))
        return JsonResponse({'data': posts}, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def create_blog_post(request):
    if request.method == 'POST':
        try:
            # Data payload
            data = request.POST
            image_url = data.get('image')
            caption = data.get('caption')
            comments = data.getlist('comments') 

            max_post = blog_posts.find_one(sort=[("post_id", -1)])  
            new_post_id = max_post['post_id'] + 1 if max_post else 1 

            blog_post = {
                "post_id": new_post_id,
                "image": image_url,
                "caption": caption,
                "date": datetime.datetime.now(),
                "comments": comments
            }

            blog_posts.insert_one(blog_post)

            return JsonResponse({"message": "Blog post created successfully", "post_id": new_post_id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
def add_comment(request, post_id):
    if request.method == 'POST':
        try:
            new_comment = request.POST.get('comment')

            post = blog_posts.find_one({'post_id': post_id})

            if not post:
                return JsonResponse({'error': 'Post not found'}, status=404)

            blog_posts.update_one(
                {'post_id': post_id},
                {'$push': {'comments': new_comment}}
            )

            return JsonResponse({"message": "Comment added successfully"}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)