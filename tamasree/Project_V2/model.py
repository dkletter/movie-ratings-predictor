from pickle import dump
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

# removing punctuation from  input text
    # punctuation = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
    # for c in plot_text:
    #     if c in punctuation:
    #         plot_text = plot_text.replace(c, "")

    lemmatizer = WordNetLemmatizer()
    word_tokens = word_tokenize(plot_text)

    filtered_sentence = []
    for w in word_tokens:
        if w not in stop_words:
            filtered_sentence.append(lemmatizer.lemmatize(w))

    Text = TreebankWordDetokenizer().detokenize(filtered_sentence)

    tfIdfVectorizer = TfidfVectorizer(
        stop_words='english',
        lowercase=True,
        strip_accents='ascii',
        max_features=70,
        use_idf=True,
        smooth_idf=True)

    vectorized_text = tfIdfVectorizer.fit_transform([Text])

    top_features = ['past', 'secret', 'team', 'agent', 'return', 'son',
                    'set', 'school', 'save', 'relationship', 'story', 'power', 'police',
                    'people', 'order', 'new', 'mysterious', 'stop', 'student', 'american',
                    'time', 'town', 'travel', 'true', 'try', 'turn', 'war', 'way', 'wife', 'woman',
                    'work', 'world', 'year', 'york', 'mother', 'mission', 'meet', 'daughter', 'event',
                    'earth', 'discovers', 'discover', 'death', 'day', 'couple', 'man', 'come', 'city', 'child',
                    'brother', 'boy', 'begin', 'fall', 'family', 'father', 'fight', 'force', 'forced', 'friend', 'girl',
                    'group', 'help', 'high', 'home', 'house', 'lead', 'life', 'love', 'make', 'young']

    text_weight = vectorized_text.toarray()[0]
    text_weight = text_weight.tolist()
    word_list = tfIdfVectorizer.get_feature_names()

    new_weight_array = [0]*70

    for word in word_list:
        if word in top_features:
            word_id = top_features.index(word)

            new_weight_array[word_id] = text_weight[word_list.index(word)]

    final_array = first_part + new_weight_array

    # load the model
    model = load(open('model.pkl', 'rb'))
    # load the scaler
    scaler = load(open('scaler.pkl', 'rb'))

    scaled_iunput = scaler.transform([final_array])

    prediction = model.predict(scaled_iunput)

    return prediction
