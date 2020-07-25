# MeMail App

## Project Dependencies

- Node 12
- Python 3.7
- MongoDB

This project uses MongoDB as database. To run this project locally you need a running instance of MongoDB on local host on port 27017 or change server settings otherwise.

## Running Project Locally

### Server

Change current directory to server:

```
cd ./server
```

Install all project dependencies:

```
pip install -r requirements.txt
```

Run flask development server:

```
FLASK_APP=./src/server.py flask run
```

### Client

Change current directory to client:

```
cd ./client
```

Install all project dependencies:

```
npm install
```

Start client with webpack dev server

```
npm start
```
