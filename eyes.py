import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
from flask.ext.cache import Cache
import random

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'filesystem', 'CACHE_DIR': 'cache'})

MONGO_URL = os.environ.get('MONGOHQ_URL')
 
if MONGO_URL:
	client = MongoClient(MONGO_URL)
	db = client.get_default_database()
	image_path = 'https://s3-us-west-1.amazonaws.com/eyespast/images2/'
else:
	client = MongoClient()
	db = client.findeyes2
	image_path = '/static/images/'

@cache.cached(timeout=60)	
@app.route('/')
def home():
	#faces = random.sample(list(db.faces.find()), 84)
	faces = db.faces.find({'random_id': {'$near': [random.random(), 0]}}).limit(84)
	return render_template('index.html', image_path=image_path, faces=faces)

@app.route('/about')
def about():
	return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)