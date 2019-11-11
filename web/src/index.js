import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { YMaps } from 'react-yandex-maps';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import reducers from './store/reducers';
import './index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <YMaps query={{ lang: 'en_US', ns: "use-load-option", apikey: 'b9208cd3-eb4d-47a2-8048-8f513d584d8e', load: "Geocoder"}}>
      <App />
    </YMaps>
  </Provider>,
  document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
