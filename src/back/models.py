from enum import unique
from pdb import lasti2lineno
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    lastname = db.Column(db.String(60), nullable=False)
    email = db.Column(db.String(60), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.id

    def serialize(self):
        return{
            "id":self.id
        }