from app import app, db
from flask import Flask, make_response, request, jsonify, render_template
import psycopg2
import datetime

from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import UserDetails
from app.user_signup import user_signup_func
from app.user_login import user_login_func, user_func, get_all_users
from app.checkout import checkout_func
from app.passbook import passbook_data
from app.mail_pdf import create_pdf


@app.route('/')
def hello():
    return 'hello world'

@app.route('/user/signup', methods=['POST'])
def signup():
    data_to_display = user_signup_func()
    return data_to_display

@app.route('/user/login', methods=['POST'])
def login():
    data_to_display = user_login_func()
    return data_to_display

@app.route('/user/checkout', methods=['POST'])
def checkout():
    data_to_display = checkout_func()
    return data_to_display

@app.route('/user/passbook', methods=['POST'])
def passbook():
    data_to_display = passbook_data()
    return data_to_display

@app.route('/user/send_mail', methods=['POST'])
def send_mail():
    data_to_display = create_pdf()
    return data_to_display

# @app.route('/user/pin', method=['GET'])
# def access():
#     access_pin = request.json.data('pin')
#     # if access_pin == '1122':
