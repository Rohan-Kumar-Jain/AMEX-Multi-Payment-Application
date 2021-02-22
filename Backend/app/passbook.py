from app import app, db
from flask import Flask, make_response, request, jsonify
from flask import request, render_template, jsonify
import psycopg2

from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import UserDetails, PaymentData


def passbook_data():
    id = request.json.get('id')
    user = UserDetails.query.filter_by(id=id).first()
    if user:
        passbook_entries = PaymentData.query.all()
        entries_list = []
        for data in passbook_entries:
            print(id)
            print(data.user_id)
            if str(id) == data.user_id:
                print("hell")
                entries ={
                        "upi_id": data.upi_id,
                        "date": data.transaction_date,
                        "amount": data.amount,
                        "description": data.description
                        }
                entries_list.append(entries)
        return jsonify(entries_list)