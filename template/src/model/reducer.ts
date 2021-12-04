import { createReducer } from 'redux-go';

import { setCount } from './action';

export interface IInitialState {
  count: number;
}

const initialState: IInitialState = {
  count: 1,
};

export default createReducer(
  {
    [setCount]: (state, action) => ({
      ...state,
      count: action.payload,
    }),
  },
  initialState,
);
