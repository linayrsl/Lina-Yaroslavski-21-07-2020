from flask import Flask, jsonify
from werkzeug.exceptions import *
import os
import logging
from src.handlers.messages import messages
import src.database.database_connection


root_path =\
    os.path.dirname(
        os.path.dirname(
            os.path.abspath(__file__)))

client_files_directory_path = os.path.join(root_path, "static")

logging.info("Serving static files from {}".format(client_files_directory_path))

app = Flask(
    __name__,
    static_folder=client_files_directory_path,
    static_url_path='')


@app.errorhandler(Exception)
def handle_error(e):
    print(type(e))
    code = 500
    if isinstance(e, BadRequest):
        code = e.code
    return jsonify(error=str(e)), code


@app.route("/")
def root():
    return app.send_static_file("index.html")


app.register_blueprint(
    messages,
    url_prefix="/api/users/<receiver>/messages")


if __name__ == "__main__":
    app.run(debug=True)
