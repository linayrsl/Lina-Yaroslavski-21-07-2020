from datetime import datetime
import logging
from flask import Blueprint, request, Response, abort, make_response
from mongoengine import QuerySet, FieldDoesNotExist, ValidationError
from werkzeug.exceptions import BadRequest

from src.models.message import Message
from http import HTTPStatus


messages = Blueprint("messages", __name__)


@messages.route("/", methods=["GET"])
def get_messages(receiver: str):
    try:
        fetched_messages: QuerySet = Message.objects(receiver=receiver)
        return Response(fetched_messages.to_json(), mimetype="application/json")
    except Exception as error:
        logging.error(error)
        return abort(HTTPStatus.INTERNAL_SERVER_ERROR)


@messages.route("/", methods=["POST"])
def add_message(receiver: str):
    try:
        message_json = request.get_json()
        message = Message(creation_date=datetime.utcnow(), receiver=receiver, **message_json)
        message.save()
        return make_response()
    except BadRequest:
        return abort(HTTPStatus.BAD_REQUEST, description="Bad request")
    except FieldDoesNotExist:
        return abort(HTTPStatus.BAD_REQUEST, description="One or more fields are incorrect")
    except ValidationError:
        return abort(HTTPStatus.BAD_REQUEST, description="One or more fields are not valid")
    except Exception as error:
        logging.error(error)
        return abort(HTTPStatus.INTERNAL_SERVER_ERROR)


@messages.route("/<message_id>", methods=["DELETE"])
def delete_message(receiver: str, message_id: str):
    try:
        fetched_messages = Message.objects(receiver=receiver, id=message_id)
        if not fetched_messages:
            print(fetched_messages)
            return Response("", status=HTTPStatus.NOT_FOUND)
        fetched_messages.delete()
        return make_response()
    except Exception as error:
        logging.error(error)
        return abort(HTTPStatus.INTERNAL_SERVER_ERROR)
