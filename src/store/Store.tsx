import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postReducer from './Post';
import userReducer from './User';

const reducer = combineReducers({
  posts: postReducer,
  user: userReducer
});

export type AppStore = ReturnType<typeof reducer>;

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware()]
});
