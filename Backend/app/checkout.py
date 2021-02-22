from app import app, db
from flask import Flask, make_response, request, jsonify
from flask import request, render_template, jsonify
import psycopg2

from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import UserDetails, PaymentData


def checkout_func():
    checkout_data = request.json.get("checkout")
    id = request.json.get("id")
    user = UserDetails.query.filter_by(id=id).first()
    if len(checkout_data) == 0:
        return "No data entered"

    else:
        for j in checkout_data:
            if user:
                description = j['description']
                upi_id = j['upi']
                amount = j['amount']
                email = j['email']
                user_email = user.email
                detail = PaymentData(description=description, email=email, user_email=user_email, amount=amount,
                                     upi_id=upi_id, user_id=str(user.id))
                print(detail)
                try:
                    db.session.add(detail)
                    db.session.commit()
                except Exception as e:
                    return str(e), 400
            else:
                return "no such user"

        return "Done Successfully"

# JSON FORMAT FOR SIGNUP
# {
# 	"full_name":"aditya",
# 	"email":"aditya@gmail.com",
# 	"password":"gandu2",
# 	"phone":"8982820676",
# 	"type":"Worker"
# }
