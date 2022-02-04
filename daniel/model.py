from pickle import dump, load
import joblib
import numpy as np
import nltk
import pandas as pd
from sklearn.preprocessing import StandardScaler
from pickle import load
from nltk import sent_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize.treebank import TreebankWordDetokenizer
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
stop_words = stopwords.words('english')
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('stopwords')



def performPrediction(inputData):

    print(inputData)

    first_part = inputData[:-1]
    print(first_part)
    plot = inputData[-1:]
    plot_text = plot[0]
    print(plot_text)

    lemmatizer = WordNetLemmatizer()
    word_tokens = word_tokenize(plot_text)

    filtered_sentence = []
    for w in word_tokens:
        if w not in stop_words:
            filtered_sentence.append(lemmatizer.lemmatize(w))

    Text = TreebankWordDetokenizer().detokenize(filtered_sentence)

    tfIdfVectorizer = joblib.load("tdidf.joblib")
    tfIdf = tfIdfVectorizer.transform([Text])

    new_weight_array = tfIdf.toarray()[0]
    print(new_weight_array)

    final_array = np.concatenate((first_part, new_weight_array), axis=0)
    print(final_array)

    # load the model
    model = load(open('model.pkl', 'rb'))
    # load the scaler
    scaler = load(open('scaler.pkl', 'rb'))

    scaled_iunput = scaler.transform([final_array])

    prediction = model.predict(scaled_iunput)

    return prediction