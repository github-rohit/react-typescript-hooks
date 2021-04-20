import { createSlice } from '@reduxjs/toolkit';
import { PostRootObject } from '../types/Post';

const initialState: PostRootObject = {
  posts: [],
  total: 0
};

const slice = createSlice({
  initialState,
  name: 'posts',
  reducers: {
    get(store: PostRootObject, actions) {
      store.posts = actions.payload.posts;
      store.total = actions.payload.total;
    }
  }
});

export const { get } = slice.actions;
export default slice.reducer;
