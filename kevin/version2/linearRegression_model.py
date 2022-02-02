import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression

import pickle

df = pd.read_csv('fin_data.csv')

df = pd.get_dummies(df)

# Split data into features and target
X = df.iloc[: , 1:22]
y = df.iloc[:, :1]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X,y,random_state= 42)

# Standardize the datset

X_scaler = StandardScaler().fit(X_train)
X_train_scaled = X_scaler.transform(X_train)
X_test_scaled = X_scaler.transform(X_test)

# set up linear regression

model = LinearRegression()

model.fit(X_train, y_train)

# predictions = model.predict(X_test)

# Save model
pickle.dump(model, open('linreg_model.pkl', 'wb'))