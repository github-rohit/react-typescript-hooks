import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';

interface UserRootObject {
  details: User | null;
}

const initialState: UserRootObject = {
  details: null
};

const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    set(store: UserRootObject, actions) {
      store.details = actions.payload;
    }
  }
});

export const { set } = slice.actions;
export default slice.reducer;
