# Movie Prediction App

We analyzed a decade of movies, developed a machine learning model, and turned it into a flask app to predict if a movie will be a hit or a flop. Just fill out the form with some basic details, such as your budget, expected running time, director, actors, even the plot. We can predict with 71% confidence if your proposed movie will be successful.

### Objective
* Train a supervised model to predict ratings of proposed movies. 
* Create an historical data analysis with ten years of movie data.
* Create an interactive web app with movie rating predictions and a dashboard of visualizations.


### ETL
* Extract using an API calls to obtain list of movies by year from OMDb.
* Transform using Python/Pandas to merge dataframes, replace null values with ‘NA’ or ‘0’ as appropriate, remove duplicates, normalize all headers
* Load the final final output to CSV and our SQL database.

### Exploratory Analysis
We analyzed the data in Python/Pandas with matplotlib, pyplot, seaborn, and wordcloud.

Some observations:
1. Surprisingly, we discovered IMDb user votes and IMDb critical ratings aren't strongly correlated.
2. Budgets and IMDb ratings aren't strongly correlated.
3. Interestingly, budgets and box office gross amount is correlated.
4. Ratings from Rotten Tomatoes and Metascore don't always reflect the same kind of feedback for the same movie.

### Preprocessing
* Create labels based on IMDb rating.
* Select beneficial columns for the model.
* Convert categorical data to numerical using One-Hot-Encoding.
* Additional cleanup of null and missing values.
* Reduce number of distributions of some features such as country, language, genre, director, writer, actor, star, and rating (i.e. PG vs. R, etc.).
* Binning the IMDb rating into 3 distinct groups of <5, between 5 and 7, and >7.
* Encode the rest of categorical data using `get_dummies`.
* Process `plot` values into vectors.
* Merge all features into a single dataframe.

Our final dataset uses the following features: runtime (mins), budget (USD), rated, director, writer, actors, language, country, genre, star, and plot.

### Building the Models
We used a supervised machine learning classification model leveraging a Random Forest Classifier. The greatest challenge was in converting the plot data into a vector to join with the rest of the model. We used a multi-step process to clean and transform words into a meaningful representation, but we did it!

### Deploying the App
We used a Flask app to serve our website with a dashboard highlighting interesting relationships with features of the data set and our prediction app. We wrote a function to bring together the vectorized plot data with the model which produces the prediction.

[Our Presentation](https://docs.google.com/presentation/d/1pIVyzZgfz74ZjjOsThbbvJReoxf9x3Ym12RAgRuAm8w/edit#slide=id.g112884da369_0_405)

### Resources
* [OMDb API](http://www.omdbapi.com)
* [Kaggle](https://www.kaggle.com/danielgrijalvas/movies)

### Team
* [Tamasree Sinha](https://github.com/tamasree)
* [Vilaysack Khonsavanh](https://github.com/KeSavanh)
* [Maria DiPasquale](https://github.com/edipasq)
* [Daniel Kletter](https://github.com/dkletter)


