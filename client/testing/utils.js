import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import reducer from '../reducers'
const enhancer = compose(applyMiddleware(thunkMiddleware))

export const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducer, initialState, enhancer) } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}
