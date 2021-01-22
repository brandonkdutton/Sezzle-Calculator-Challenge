from main import app, socketio, db
from flask import jsonify
from datetime import datetime
from dateutil import parser


class TestMain:
    """ Tests for main.py. To run tests navigate to the 'back-end' directory and run: '$pytest' """

    def get_test_client(self):
        """ returns a socketio test client for the tests to use """
        flask_test_client = app.test_client()
        socketio_test_client = socketio.test_client(
            app, flask_test_client=flask_test_client
        )
        return socketio_test_client

    def wipe_db(self):
        """ empties the db """
        db.drop_all()
        db.create_all()

    def fill_db(self):
        """ fills the db with test equations """
        self.wipe_db()
        socketio_test_client = self.get_test_client()
        for i in range(25):
            equation = f"{i} + {i}"
            result = f"{i+i}"
            socketio_test_client.emit(
                "equation_added", {"equation": equation, "result": result}
            )

    def test_initial_fetch_empty(self):
        """ tests that the initial equation fetch for an empty db """
        self.wipe_db()
        socketio_test_client = self.get_test_client()

        flask_test_client = app.test_client()
        socketio_test_client = socketio.test_client(
            app, flask_test_client=flask_test_client
        )

        # make sure the connection gets established
        assert socketio_test_client.is_connected()

        # check that empty db returns nothing on initial connection
        initial_fetch_empty = socketio_test_client.get_received()
        initial_fetch_empty_payload = initial_fetch_empty.pop()["args"][0]
        assert len(initial_fetch_empty_payload["equations"]) == 0

    def test_insert_equations(self):
        """ Tests the validity of inserted and then broadcasted equation data agains the origional data """
        socketio_test_client = self.get_test_client()
        self.wipe_db()

        # add 25 equations to the db and check that server broadcasts its payload with id and timestamp back
        for i in range(25):
            equation = f"{i} + {i}"
            result = f"{i+i}"
            socketio_test_client.emit(
                "equation_added", {"equation": equation, "result": result}
            )

            # get rebroadcasted payload
            inserted = socketio_test_client.get_received()
            inserted_payload = inserted.pop()["args"][0]

            # validate payload
            assert inserted_payload is not None
            assert inserted_payload["id"] == i + 1
            assert inserted_payload["equation"] == equation
            assert inserted_payload["result"] == result

            # check that timestamp is no more than 10 seconds old
            date_string = inserted_payload["date_created"]
            date_obj = date = parser.parse(date_string)
            delta = (datetime.utcnow() - date_obj).total_seconds()
            assert delta < 5

    def test_initial_fetch_full(self):
        """ Tests that the initial fetch on a db with more than 10 entries returns no more than 10 equations """
        self.fill_db()
        socketio_test_client = self.get_test_client()

        # test that initial fetch returns no more than 10 equations despite 25 being in the db
        assert socketio_test_client.is_connected()

        # no 10 equations should come back
        initial_fetch_full = socketio_test_client.get_received()
        initial_fetch_full_payload = initial_fetch_full.pop()["args"][0]

        assert len(initial_fetch_full_payload["equations"]) == 10

        # end tests
        socketio_test_client.disconnect()


# usefull for debugging tests
if __name__ == "__main__":
    test_class = TestSocketApi()
    test_class.test_initial_fetch_empty()
    test_class.test_insert_equations()
    test_class.test_initial_fetch_full()