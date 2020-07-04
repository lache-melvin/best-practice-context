import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import thunkMiddleware from 'redux-thunk'
import '@testing-library/jest-dom'

import reducer from '../reducers'
const enhancer = compose(applyMiddleware(thunkMiddleware))

export const renderWithRedux = (
  ui,
  { initialState, initialEntries = ['/'], store = createStore(reducer, initialState, enhancer) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router initialEntries={initialEntries} initialIndex={0}>
          {ui}
        </Router>
      </Provider>
    ),
    store
  }
}
