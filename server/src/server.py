from flask import Flask

from src.handlers.messages import messages
import src.database.database_connection

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello world"


app.register_blueprint(
    messages,
    url_prefix="/api/users/<receiver>/messages")

if __name__ == "__main__":
    app.run(debug=True)
