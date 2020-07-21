from mongoengine import *


class Message(Document):
    sender = StringField(required=True)
    receiver = StringField(required=True)
    message = StringField(required=True)
    subject = StringField(required=True)
    creation_date = DateTimeField(required=True)
