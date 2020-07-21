from datetime import datetime
from flask import Blueprint, request, Response, abort, make_response, jsonify
from mongoengine import QuerySet

from src.models.message import Message

messages = Blueprint("messages", __name__)


@messages.route("/", methods=["GET"])
def get_messages(receiver: str):
    try:
        fetched_messages: QuerySet = Message.objects(receiver=receiver)
        if not messages:
            return abort(404, description="No messages were found")
        return Response(fetched_messages.to_json(), mimetype="application/json")
    except Exception as ex:
        print(ex)
        return abort(500, description="Internal server error")


@messages.route("/", methods=["POST"])
def add_message(receiver: str):
    try:
        message_json = request.get_json()
        message = Message(creation_date=datetime.utcnow(), receiver=receiver, ** message_json)
        message.save()
        return make_response()
    except Exception as ex:
        print(ex)
        return abort(500, description="Failed to add message")


@messages.route("/<message_id>", methods=["DELETE"])
def delete_message(receiver: str, message_id: str):
    try:
        Message.objects(receiver=receiver, _id=message_id).delete()
        return make_response()
    except Exception as ex:
        print(ex)
