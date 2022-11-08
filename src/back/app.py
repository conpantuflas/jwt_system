from crypt import methods
from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, User
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_bcrypt import Bcrypt
import re


#-------------------------(app.config)
app = Flask(__name__)
db.init_app(app)
CORS(app)
Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgresql@localhost:5432/jwt_system'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'super-secreta' #bccypt
app.config['JWT_SECRET_KEY'] = 'mas-secreta-aun' #jwt


#-------------------------(regex)
email_reg = '([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'
password_reg = '^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$'


@app.route('/signup', methods=['POST'])
def create_user():

    name = request.json.get('name')
    lastname = request.json.get('lastname')
    email = request.json.get('email')
    password = request.json.get('password')

    if email != ''  and  re.search(email_reg,email):
        user = User.query.filter_by(email = email).first()
        if user is not None:
            return jsonify({
                'msg': 'user already exists'
            }),400

        else:
            if  password != '' and re.search(password_reg, password):
                user = User()
                user.name = name
                user.lastname = lastname
                user.email = email

                password_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
                user.password = password_hash

                db.session.add(user)
                db.session.commit()

                return jsonify({
                    'msg': 'congratulations, account created'
                }),200

    else:
        return jsonify({
            'msg': 'wrong format password'
        }),400



@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    if password  == '' and email == '':
        return jsonify({
            "msg": 'email or password empty'
        }),400
    else:
        user = User.query.filter_by( email = email ).first()
        if user is not  None:
            user_password = user.password
            check_password = bcrypt.check_password_hash(user_password, password)
            if check_password:
                access_token = create_access_token(identity = email)
                return jsonify({
                    'user': user.serialize(),
                    'access_token': access_token
                }), 200
            else:
                return jsonify ({
                    'msg': 'email or password is invalid'
                }), 400
        else:
            return jsonify({
                "msg": "user not found, go to register"
            }), 400

if __name__ == "__main__":
    app.run(host="localhost", port="5000")