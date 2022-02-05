from flask import Flask, render_template, request, jsonify
import json
import numpy as np
from model import performPrediction
from sklearn.ensemble import RandomForestClassifier
from pickle import load


# Define a flask app
app = Flask(__name__)

# Import ML model
# model = pickle.load(open('linreg_model.pkl', 'rb'))

# create a route for home
########################################################################
#  Routes for data                                                     #
########################################################################


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

    predictedRating = performPrediction(request.json)

    print(predictedRating)

    prediction = 'This movie will gain IMDB rating: '
    if predictedRating[0] == 0:
        prediction = prediction + 'lower than 5'
    elif predictedRating[0] == 1:
        prediction = prediction + 'in a range between 5 and 7'
    elif predictedRating[0] == 2:
        prediction = prediction + 'greater than 7'

    return jsonify(prediction)


@app.route('/')
def main():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
