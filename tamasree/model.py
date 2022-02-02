from pickle import load
from sklearn.preprocessing import StandardScaler


def performPrediction(inputData):
    print(inputData)
    # load the model
    model = load(open('model.pkl', 'rb'))
    # load the scaler
    scaler = load(open('scaler.pkl', 'rb'))

    scaled_iunput = scaler.transform(inputData)

    prediction = model.predict(scaled_iunput)

    return prediction
