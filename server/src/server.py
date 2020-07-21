from flask import Flask, jsonify
from werkzeug.exceptions import *

from src.handlers.messages import messages
import src.database.database_connection

app = Flask(__name__)


@app.errorhandler(Exception)
def handle_error(e):
    print(type(e))
    code = 500
    if isinstance(e, BadRequest):
        code = e.code
    return jsonify(error=str(e)), code


app.register_blueprint(
    messages,
    url_prefix="/api/users/<receiver>/messages")

if __name__ == "__main__":
    app.run(debug=True)
