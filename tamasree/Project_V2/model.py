from pickle import dump
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
    plot_text = inputData[-1]

# removing punctuation from  input text
    punctuation = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
    for c in plot_text:
        if c in punctuation:
            plot_text = plot_text.replace(c, "")

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

    tfIdf = tfIdfVectorizer.fit_transform([Text])

    index = tfIdfVectorizer.get_feature_names()

    top_features = pd.DataFrame(tfIdf[0].T.todense(
    ), index=tfIdfVectorizer.get_feature_names(), columns=["TF-IDF"])

    top_features = top_features.sort_values(
        'TF-IDF', ascending=False).index.tolist()
    number_weights = tfIdf[0].T.todense()

    # load the model
    model = load(open('model.pkl', 'rb'))
    # load the scaler
    scaler = load(open('scaler.pkl', 'rb'))

    scaled_iunput = scaler.transform(inputData)

    prediction = model.predict(scaled_iunput)

    return prediction
