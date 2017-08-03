import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import { createStore, Action, Dispatch, Middleware, Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { Button } from 'react-bootstrap';
import "es6-string-polyfills";
require('es6-object-assign').polyfill();
require('es6-map/implement');
const { default: immutableStateInvariant } = require('redux-immutable-state-invariant');

import { combinedReducers } from './rootReducer';

import {
    ZMenuModel,
    ZMenuItemModel
} from './modules/zcommon';

import * as ZAplicacion from "./modules/zaplicacion";
import { ZListadoAplicacionesContainer } from "./modules/app/containers/ZListadoAplicacionesContainer";


import {

    //Models
    ZRecursoViewModel,
    State,

    //Utils
    EntityNormalizedObj,

} from "./modules/zcommon";

//let store = createStore(combinedReducers, initialState);
declare const __DEV__: boolean; // from webpack
if (__DEV__) {
    console.log("dev stage");
}

const middlewares = __DEV__ ?
    [immutableStateInvariant(), thunk] :
    [thunk];

declare let window: any;
const store = createStore(
    combinedReducers,
    redux.compose(redux.applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f)
);

ReactDOM.render(
    <Provider store={store}>
        <ZListadoAplicacionesContainer />
    </Provider>,
    document.getElementById("app-container")
);