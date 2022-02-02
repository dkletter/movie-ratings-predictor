from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize.treebank import TreebankWordDetokenizer
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk import sent_tokenize
from pickle import load
from sklearn.preprocessing import StandardScaler
import pandas as pd
import nltk
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('stopwords')


def performPrediction(inputData):

    print(inputData)
    # load the model
    model = load(open('model.pkl', 'rb'))
    # load the scaler
    scaler = load(open('scaler.pkl', 'rb'))

    scaled_iunput = scaler.transform(inputData)

    prediction = model.predict(scaled_iunput)

    return prediction
