########################################################################
### Dependencies#####

from flask import Flask, render_template, request, jsonify
import json
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from model import performPrediction


########################################################################

# Define a flask app
app = Flask(__name__)

########################################################################
#  Routes for data                                                     #
########################################################################

# actors
@app.route('/actors')
def fetchActors():
    f = open('json_files/actor.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# country
@app.route('/country')
def fetchCountry():
    f = open('json_files/country.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# languages
@app.route('/language')
def fetchLanguage():
    f = open('json_files/language.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# writer
@app.route('/writer')
def fetchWriter():
    f = open('json_files/writer.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# director
@app.route('/director')
def fetchDirector():
    f = open('json_files/director.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# star
@app.route('/star')
def fetchStar():
    f = open('json_files/star.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# rated
@app.route('/rated')
def fetchRated():
    f = open('json_files/rated.json')
    data = json.load(f)
    f.close()
    return jsonify(data)

# genre
@app.route('/genre')
def fetchGenre():
    f = open('json_files/genre.json')
    data = json.load(f)
    f.close()
    return jsonify(data)
########################################################################
#  Routes for visualizations                                           #
########################################################################

@app.route("/vizdata")
def vizdata():
    f = open('json_files/Movies.json')
    data = json.load(f)
    f.close()
    return jsonify(data)


########################################################################
#  Routes for pages                                                    #
########################################################################

# Landing page
@app.route('/')
def main():
    return render_template('index.html')

# Dashboard page
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Predicting page
@app.route('/prediction')
def prediction():
    return render_template('prediction.html')

########################################################################
#  Routes for prediction excution                                      #
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
