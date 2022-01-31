from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np


# Define a flask app
app = Flask(__name__)

# Import ML model
model = pickle.load(open('linreg_model.pkl', 'rb'))

# create a route for home
@app.route('/')
def main():
  return render_template('index.html')

# create a route for prediction
@app.route('/predict', methods=['POST'])
def home():
  # if request.method == "POST":
    
    # f0 = float(request.form['metascore'])
    # f1 = float(request.form['internet_movie_database_rating'])
    # f2 = float(request.form['rotten_tomato_rating'] )
    # f3 = float(request.form['metacritic_rating'])
    # f4 = float(request.form['budget'])
    # f5 = float(request.form['Action'])
    # f6 = float(request.form['Adventure'])
    # f7= float(request.form['Animation'])
    # f8= float(request.form['Biography'])
    # f9= float(request.form['Comedy'])
    # f10= float(request.form['Crime'])
    # f11= float(request.form['Drama'])
    # f12= float(request.form['Family'])
    # f13= float(request.form['Fantasy'])
    # f14= float(request.form['Horror'])
    # f15= float(request.form['Musical'])
    # f16= float(request.form['Mystery'])
    # f17= float(request.form['Romance'])
    # f18= float(request.form['Sci-Fi'])
    # f19= float(request.form['Sport'])
    # f20= float(request.form['Thriller'])
   
    # fin_features = [np.array([f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18,f19,f20])]

    int_features = [float(x) for x in request.form.values()]
    fin_features = [np.array(int_features)]
    pred = model.predict(fin_features)
    output = round(pred[0], 1)

  
    return render_template('index.html', prediction=output, features=fin_features) 
    #  prediction=output,

if __name__ == "__main__":
  app.run(debug=True)