import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import productEditorReducer from './reducers'
import ProductEditor from './components/ProductEditor.jsx'

let store = createStore(productEditorReducer, applyMiddleware(thunkMiddleware));

window.store = store;

render(
  <Provider store={store}>
    <ProductEditor />
  </Provider>,
  document.getElementById("container")
);