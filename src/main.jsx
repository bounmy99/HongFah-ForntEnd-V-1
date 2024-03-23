import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './components/redux/index.jsx';
const store = createStore(rootReducer, composeWithDevTools());
import 'boxicons/css/boxicons.min.css'
ReactDOM.createRoot(document.getElementById('root')).render(
 
      <Provider store={store}>
        <Router>
              <App />
        </Router>
      </Provider>,
   
)
