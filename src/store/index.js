import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//// slice
import accountSlice from './reducers/accountSlice';
import dataAllSlice from './reducers/dataAllSlice';
import requestFoodSlice from './reducers/requestFoodSlice';
import statesSlice from './reducers/statesSlice';
import postRequestSlice from './reducers/postRequestSlice';
import EditDataUser from './reducers/EditDataUser';
import ordersListSlice from './reducers/ordersListSlice';

const reducer = combineReducers({
  dataAllSlice,
  requestFoodSlice,
  statesSlice,
  postRequestSlice,
  EditDataUser,
  ordersListSlice,
  accountSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['statesSlice', 'accountSlice'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export { store };
