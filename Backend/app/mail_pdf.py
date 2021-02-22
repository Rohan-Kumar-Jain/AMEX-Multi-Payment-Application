from app import app, db
from flask import Flask, make_response, request, jsonify
from flask import request, render_template, jsonify
import psycopg2

from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import UserDetails, PaymentData
# from email.MIMEMultipart import MIMEMultipart
# from email.MIMEText import MIMEText
# from email.MIMEImage import MIMEImage
from fpdf import FPDF
from datetime import date

today = date.today()
d1 = today.strftime("%d/%m/%Y")
# print("d1 =", d1)


pdf = FPDF()

# Add a page
pdf.add_page()




def create_pdf():
    checkout_data = request.json.get("checkout")
    id = request.json.get("id")
    user = UserDetails.query.filter_by(id=id).first()
    i=1
    if len(checkout_data) == 0:
        return "No data entered"

    else:
        for j in checkout_data:
            if user:
                i=i+1
                description = j['description']
                upi_id = j['upi']
                amount = j['amount']
                email = j['email']
                user_email = user.email
                user_upi = user.upi_id
                pdf.set_font("Arial", 'B', size=24)

                # create a cell
                pdf.cell(200, 20, txt="Extenders Multipayment Invoice",
                         ln=1, align='C')

                pdf.cell(200, 20, txt="",
                         ln=1, align='C')

                pdf.set_font("Arial", 'B', size=14)

                pdf.cell(290, 0, txt="UPI I'd :", ln=2, align='A')
                pdf.cell(290, 0, txt="Invoice Date :", ln=2, align='C')

                pdf.set_font("Arial", size=14)

                pdf.cell(350, 0, txt=str(d1), ln=2, align='C')
                pdf.cell(70, 0, txt=str(user_upi), ln=2, align='C')
                pdf.cell(200, 10, txt="", ln=3, align='C')

                pdf.set_font("Arial", size=14)

                pdf.cell(200, 0, txt="Payer's Mail I'd:" + str(user_email), ln=4, align='A')
                pdf.cell(200, 25, txt="", ln=5, align='C')

                pdf.set_font("Arial", size=14)

                pdf.cell(200, 0, txt="Payee's Mail I'd: " + str(email), ln=6, align='A')
                pdf.cell(200, 10, txt="", ln=7, align='C')

                pdf.set_font("Arial", 'B', size=14)

                pdf.cell(200, 0, txt="Payment Date: ", ln=8, align='A')

                pdf.set_font("Arial", size=14)

                pdf.cell(94, 0, txt=str(d1), ln=8, align='C')
                pdf.cell(200, 10, txt="", ln=9, align='C')

                pdf.set_font("Arial", 'B', size=14)

                pdf.cell(200, 0, txt="Payee's UPI I'd: ", ln=10, align='A')

                pdf.set_font("Arial", size=14)

                pdf.cell(125, 0, txt=str(upi_id), ln=10, align='C')
                pdf.cell(200, 25, txt="", ln=11, align='C')

                pdf.set_font("Arial", 'B', size=14)

                pdf.cell(200, 0, txt="Paid Amount: ", ln=12, align='A')

                pdf.set_font("Arial", size=14)

                pdf.cell(92, 0, txt="Rs " + str(amount), ln=12, align='C')
                pdf.cell(200, 10, txt="", ln=13, align='C')

                pdf.set_font("Arial", size=14)
                pdf.cell(200, 0, txt="Description : " + str(description), ln=14, align='A')
                pdf.cell(190, 60, txt="", ln=15, align='C')

                pdf.set_font("Arial", 'I', size=11)
                pdf.set_text_color(192, 192, 192)
                pdf.cell(200, 0, txt="This is a Auto Generated Invoice", ln=16, align='C')

                pdf.output(str(upi_id)+str(amount)+".pdf")


                # msg = MIMEMultipart()
                # msg.attach(MIMEText(open("./"+str(upi_id)+str(amount)+".pdf").read()))
                # mailer = smtplib.SMTP()
                # mailer.connect()
                # mailer.sendmail(csecgroup2017@gmail.com, email, msg.as_string())
                # mailer.close()



            else:
                return "no such user"

        return "Done Successfully"