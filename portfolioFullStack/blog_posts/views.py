from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.shortcuts import render
from .models import blog_posts, comments
from django.http import JsonResponse
from gridfs import GridFS
from pymongo import MongoClient
import datetime
from bson import ObjectId
import base64

client = MongoClient('mongodb+srv://jadidalam08:LmbNz0lPrMT5kibI@portfolio.puspl.mongodb.net/?retryWrites=true&w=majority&appName=portfolio')
db = client['blog'] 
blog_posts = db['blogData']
fs = GridFS(db)

def get_blog_posts(request):
    try:
        posts = list(blog_posts.find({}, {'_id': 0}))
        
        for post in posts:
            image_id = post.get('image')
            if image_id:
                try:
                    image_file = fs.get(ObjectId(image_id))
                    image_data = base64.b64encode(image_file.read()).decode('utf-8')
                    post['image'] = f"data:image/jpg;base64,{image_data}"
                except Exception as e:
                    post['image'] = None
                    
        return JsonResponse({'data': posts}, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def get_comment_posts(request):
    try:
        posts = list(comments.find({}, {'_id': 0}))
        return JsonResponse({'data': posts}, safe=False, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['POST'])
def create_blog_post(request):
    print("Request received:", request.data)
    caption = request.data.get('caption')
    date1 = datetime.datetime.now() 
    date = date1.strftime("%d/%m/%Y")
    image = request.FILES.get('image')

    if not all([caption, date, image]):
        return Response({'error': 'All fields are required'}, status=400)
    
    max_post = blog_posts.find_one(sort=[("post_id", -1)])  
    new_post_id = max_post['post_id'] + 1 if max_post else 1 

    image_id = fs.put(image.read(), filename=image.name)

    new_post = {
        'post_id': new_post_id,
        'caption': caption,
        'date': date,
        'image': str(image_id),
    }

    blog_posts.insert_one(new_post)

    return Response({'message': 'Post created successfully'}, status=201)

        
@api_view(['POST'])
def add_comment(request, post_id):
    print("Request received:", request.data)
    date1 = datetime.datetime.now() 
    date = date1.strftime("%d/%m/%Y")
    comment = request.data.get('comment')

    if not all([date, comment]):
        return Response({'error': 'All fields are required'}, status=400)


    new_post = {
        'post_id': post_id,
        'date': date,
        'comment': comment,
    }

    comments.insert_one(new_post)

    return Response({'message': 'Post created successfully'}, status=201)
