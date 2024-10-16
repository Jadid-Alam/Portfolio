import pymongo

url = 'mongodb+srv://jadidalam08:LmbNz0lPrMT5kibI@portfolio.puspl.mongodb.net/'
client = pymongo.MongoClient(url)

db = client['blog']