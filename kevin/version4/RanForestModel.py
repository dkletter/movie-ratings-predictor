import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

import pickle

df = pd.read_csv('fin_data.csv')
# Split data into features and target
df2=df.drop('label',axis=1)
y=df['label']

X=pd.get_dummies(df2)



# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.3, random_state=1)

# Standardize the datset

scaler=StandardScaler().fit(X_train)
X_train_scaled=scaler.transform(X_train)
X_test_scaled=scaler.transform(X_test)

# set up Random forest classification model

model=RandomForestClassifier (random_state=1,n_estimators=500)
model.fit(X_train_scaled,y_train)


# predictions = model.predict(X_test)

# Save model
pickle.dump(model, open('ranforest_model.pkl', 'wb'))