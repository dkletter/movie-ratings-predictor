from flask import Flask, render_template, request, jsonify
import json
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from model import performPrediction


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

@app.route('/rated')
def fetchRated():
    f = open('json_files/rated.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

@app.route('/genre')
def fetchGenre():
    f = open('json_files/genre.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

@app.route('/main')
def dashboard():
    return render_template('main.html')

@app.route('/prediction')
def prediction():
    return render_template('prediction.html')

########################################################################
#  Routes for data                                                     #
########################################################################


@app.route('/predict', methods=['POST'])
def predict():
    
    predictedlable = performPrediction(request.json)
    print(predictedlable)

    prediction = 'This movie will gain IMDB rating:'    
    if predictedlable[0] == 0:
        prediction = prediction + 'lower than 5'
    
    elif predictedlable[0] == 1:
        prediction = prediction + 'in a range between 5 and 8'
    
    elif predictedlable[0] == 2:
        prediction = prediction + 'greater than 8'
        
    return jsonify(prediction) 

    
if __name__ == "__main__":
    app.run( debug=True)
