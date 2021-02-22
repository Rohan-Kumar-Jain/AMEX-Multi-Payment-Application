from app import app, db
from flask import Flask, make_response, request, jsonify
from flask import request, render_template, jsonify
import psycopg2

from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import UserDetails


def user_signup_func():
    email = request.json.get('email')
    user = UserDetails.query.filter_by(email=email).first()
    if not user:
        password = request.json.get('password')
        hashed_password = generate_password_hash(password, method='sha256')
        full_name = request.json.get('full_name')
        phone = request.json.get('phone')
        upi_id = request.json.get('upi_id')

        detail = UserDetails(full_name=full_name, email=email, password=hashed_password, phone=phone, upi_id=upi_id)
        print(detail)
        try:
            db.session.add(detail)
            db.session.commit()
        except Exception as e:
            return str(e), 400
        return 'User Registered Successfully', 200
    else:
        return "Already Registered"

# JSON FORMAT FOR SIGNUP
# {
# 	"full_name":"aditya",
# 	"email":"aditya@gmail.com",
# 	"password":"gandu2",
# 	"phone":"8982820676",
# 	"type":"Worker"
# }
