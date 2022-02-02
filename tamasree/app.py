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

    # predictedRating=performPrediction(request.json)
    #result = loaded_model.score(X_test, Y_test)

    # load the model
    input_data = [np.array(request.json)]
    # input_data_reshaped = input_data.reshape(-1, 1)
    # print(input_data_reshaped)

    model = load(open('model.pkl', 'rb'))
    # load the scaler
    scaler = load(open('scaler.pkl', 'rb'))

    scaled_iunput = scaler.transform(input_data)

    prediction = model.predict(scaled_iunput)
    print(prediction)

    return jsonify(prediction.tolist())


@app.route('/')
def main():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)
