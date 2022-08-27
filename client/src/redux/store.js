import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from './adminRedux';
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer, admin: adminReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer, adminReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
