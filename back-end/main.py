from flask import Flask, jsonify
from flask_socketio import SocketIO, send, emit
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
import config


app = Flask(__name__)

app.config.from_object("config")

db = SQLAlchemy(app)
ma = Marshmallow(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# sqlAlchemy table definition to store equations
class EquationsTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    equation = db.Column(db.String(50), nullable=False)
    result = db.Column(db.String(50), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow, index=True)


# marshmallow schema to jsonify sqlAlchemy's query results
class EquationsTableSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EquationsTable


# creates the database tables if they don't already exist
db.create_all()


@socketio.on("equation_added")
def on_equation_added(json):
    """ Adds a new equation to the database and broadcasts result to all connected clients """
    try:
        new_row = EquationsTable(equation=json["equation"], result=json["result"])
        db.session.add(new_row)
        db.session.commit()
    except Exception as e:
        print(e)
        raise e

    try:
        schema = EquationsTableSchema()
        data = schema.dump(new_row)
    except Exception as e:
        print(e)
        raise e

    emit("equation_broadcasted", data, broadcast=True)


@socketio.on("connect")
def on_connected():
    """ Returns the 10 most recent equations from the database """
    try:
        query_result = (
            EquationsTable.query.order_by(EquationsTable.date_created.desc())
            .limit(10)
            .all()
        )
    except Exception as e:
        print(e)
        raise e

    try:
        schema = EquationsTableSchema(many=True)
        data = schema.dump(query_result)
    except Exception as e:
        print(e)
        raise e

    emit("initial_fetch", {"equations": data})


if __name__ == "__main__":
    socketio.run(app)