from mongoengine import *

from src.settings import MONGODB_URI

connect(MONGODB_URI)
