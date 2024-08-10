import { configureStore , combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage'
import { version } from 'mongoose'
//since we are using more than one reducer therefore we need to combie the rediucer

const rootReducer = combineReducers({
  user:userReducer,
})

//persist config stores the data in local storage and does not loss it while refreshing the page

const persistConfig = {
  key: 'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig , rootReducer)

export const store = configureStore({
  reducer: persistedReducer, 
  //we need to add a default middleware for checking errors
  middleware : (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck:false})
})

export const persistor  = persistStore(store)
