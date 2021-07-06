import React from 'react'
import ReactDom from 'react-dom'
import App from './App';
import {Provider} from 'react-redux'
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk'
import  RootReducer from './reducers/rootReducer'
import './index.css';

const store=createStore(RootReducer,compose(applyMiddleware(thunk)));

ReactDom.render(
    <Provider store={store}>
     <App />
    </Provider>,
    document.getElementById('root')
    );