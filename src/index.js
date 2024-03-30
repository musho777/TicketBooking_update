import './index.css'
import App from './App'
import React from 'react'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import Reducer from './services/reducer/reducer'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import ReactGA from './components/analytics/analytics'
ReactGA.initialize("G-EJ688S4ZVM");

ReactGA.send({ hitType: "pageview", page: "/my-path", title: "Custom Title" });
ReactGA.event({
  category: 'Conversion',
  action: 'Submit', // You can customize the action as per your requirement
});
const store = createStore(
  Reducer,
  applyMiddleware(thunk)
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

reportWebVitals()