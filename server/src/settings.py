import os

MONGODB_URI = os.environ.get("MONGODB_URI", "homework_project_db")
EMAILS_PER_PAGE = int(os.environ.get("EMAILS_PER_PAGE", 10))

