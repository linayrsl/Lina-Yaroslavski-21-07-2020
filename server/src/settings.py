import os

MONGODB_URI = os.environ.get("MONGODB_URI", "mongodb://localhost:27017")
EMAILS_PER_PAGE = int(os.environ.get("EMAILS_PER_PAGE", 10))
