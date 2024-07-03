// src/store.js
import { createStore } from 'redux';

const initialState = {
  user: null,
  requests: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
