from mongoengine import *


class Message(Document):
    sender = StringField(required=True)
    receiver = StringField(required=True)
    message = StringField(required=False)
    subject = StringField(required=True)
    creation_date = DateTimeField(required=True)
