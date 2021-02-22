from app import app, db
from flask import Flask, make_response, request, jsonify
from flask import request, render_template, jsonify
import psycopg2
import datetime
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import UserDetails


def user_login_func():
    email = request.json.get('email')
    password = request.json.get('password')
    user = UserDetails.query.filter_by(email=email).first()
    # if user.password == password:
    #     return "Successfully Logged In",200
    # else:
    #     return "Wrong Password",400
    # auth = request.authorization
    # print(auth)
    #
    # if not auth or not auth.username or not auth.password:
    #     return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})
    #
    # user = User_details.query.filter_by(email=auth.username).first()
    #
    if not user:
        return make_response('Could not verify', 402, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if check_password_hash(user.password, password):
        login_data = { 'id': user.id, "upi_id":user.upi_id}
        return jsonify(login_data)
        # return jsonify({'token': token.decode('UTF-8')})

    return make_response('Could not verify', 403, {'WWW-Authenticate': 'Basic realm="Login required!"'})


# JSON Format for Token & id
# {
#   "id": 4,
#   "upi_id": "aditya@paytm"
# }



def user_func():
    email = request.json.get('email')
    password = request.json.get('password')
    user_details = UserDetails.query.filter_by(email=email).first()
    if user_details.password == password:
        return "Successfully Logged In", 200
    else:
        return "Wrong Password", 400
# JSON FORMAT FOR LOGIN
# {
# 	"email":"aditya@gmail.com",
# 	"password":"gandu2"
# }


def get_all_users():
    user_data = UserDetails.query.all()
    data_list = []
    for data in user_data:
        id = data.id
        email = data.email
        password = data.password
        data_dict = {"id":str(id), "email":email, "password":password, "full_name":data.full_name, "rating":data.rating, "type":data.type}
        data_list.append(data_dict)
    return jsonify(data_list)
