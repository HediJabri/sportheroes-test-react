import React from 'react';
import { render } from '@testing-library/react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { initialState, fetchActivities } from '../redux/reducers';

export function renderWithRedux(component) {
  const store = createStore(
    fetchActivities,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
  return render(<Provider store={store}>{component}</Provider>);
}
