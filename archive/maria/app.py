from flask import Flask, render_template, redirect, jsonify, request
import modelrun

#from sqlalchemy.ext.automap import automap_base
import os
# Create an instance of Flask
app = Flask(__name__)


@ app.route('/')
def home():
    # Return the template
    return render_template('index.html')


@ app.route('/send', methods=["GET", "POST"])
def predic():

    if request.method == "POST":
        loan_amount = request.form.get('loan_amnt')
        interest_rate = request.form.get("int_rate")
        installement = request.form.get("installment")
        anual_income = request.form.get('anual_inc')

        variables = [loan_amount, interest_rate,
                     installement,  anual_income]
        predict = modelrun.preprocess(variables)
        predict, *_ = predict
        # Return the template

        return render_template("index.html", pred=variables, prediction=predict)
    else:
        return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
