from flask import Flask, render_template, request, jsonify
import json
import pickle
import numpy as np


# Define a flask app
app = Flask(__name__)

# Import ML model and scaler


# create a route for home
########################################################################
#  Routes for data                                                     #
########################################################################


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/actors')
def fetchActors():
    f = open('json_files/actor.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


@app.route('/country')
def fetchCountry():
    f = open('json_files/country.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


@app.route('/language')
def fetchLanguage():
    f = open('json_files/language.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


@app.route('/writer')
def fetchWriter():
    f = open('json_files/writer.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


@app.route('/director')
def fetchDirector():
    f = open('json_files/director.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


@app.route('/star')
def fetchStar():
    f = open('json_files/star.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


@app.route('/predict', methods=['POST'])
def predict():
    input_plot = request.form['plot']
    print(input_plot)
    input_data = [np.array(request.json)]

    model = pickle.load(open('model.pkl', 'rb'))
    scaler = pickle.load(open('scaler.pkl', 'rb'))
    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)
    
    if prediction[0] == 0:
        prediction_text = 'lower than 5'
    
    elif prediction[0] == 1:
        prediction_text = 'in a range between 5 and 7'
    
    elif prediction[0] == 2:
        prediction_text = 'greater than 8'
        
    return render_template('index.html', prediction=prediction_text, features=input_scaled) 

    



if __name__ == "__main__":
    app.run(port=2000, debug=True)
