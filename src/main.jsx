import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App.jsx'

//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './components/redux/index.jsx';
const store = createStore(rootReducer);
import 'boxicons/css/boxicons.min.css'
ReactDOM.createRoot(document.getElementById('root')).render(
 
      <Provider store={store}>
        <Router>
              <App />
        </Router>
      </Provider>,
   
)
