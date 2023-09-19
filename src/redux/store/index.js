import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../reducers/favoritesReducer";
import jobsReducer from "../reducers/jobsReducer";
// import mainReducer from '../reducers'

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SUPER_SECRET_KEY,
      // onError: function (error) {
      //   // Handle the error.
      // },
    }),
  ],
};

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  jobs: jobsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { persistor, store };
