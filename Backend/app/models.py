from app import db
import datetime
from sqlalchemy import Table, Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship


class UserDetails(db.Model):
    __tablename__ = "user_details"
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    full_name = db.Column(db.String(), index=True)
    email = db.Column(db.String(), unique=True, index=True)
    password = db.Column(db.String(), index=True)
    phone = db.Column(db.String(10))
    upi_id = db.Column(db.String(40))


    def __repr__(self):
        return f'<User> {self.id}, {self.full_name}, {self.email}, {self.password},{self.phone}, {self.upi_id}'

class PaymentData(db.Model):
    __tablename__ = "payment_data"
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    description = db.Column(db.String(), index=True)
    email = db.Column(db.String(), index=True)
    user_id = db.Column(db.String(), index=True)
    user_email = db.Column(db.String())
    upi_id = db.Column(db.String(40))
    amount = db.Column(db.Integer)
    transaction_date = db.Column(db.DateTime, default=datetime.datetime.utcnow)