To install:
From within the 'front-end' directory run the following commands:

1. $yarn install

From within the 'back-end' directory run the following commands:

1. $python3 -m venv venv
2. $. venv/bin/activate
3. $pip install -r requirements.txt

To Run:
First from within the 'back-end' directory run the following commands:

1. $. venv/bin/activate
2. $python3 serve.py

Now from within the 'front-end' directory run the following commands:

1. $npm start
2. navigate to http://localhost:3000

Please Note:

- This uses an sqlite3 database so that it can be easily run locally, but the config file can be edited to use a real relational database. The live version of this app that I am hosting uses a mySql database from AWS.
