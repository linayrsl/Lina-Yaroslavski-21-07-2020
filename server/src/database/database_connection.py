from mongoengine import *

from src.settings import MONGODB_URI

connect("homework_project_db", host=MONGODB_URI)
