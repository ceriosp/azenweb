declare const process: any;

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

import * as App from './modules/app';
import * as ZUtils from './modules/zutils';

import {
    ZMenuModel,
    ZMenuItemModel
} from './modules/zcommon';

import * as ZAplicacion from "./modules/zaplicacion";
import { ZAplicacionContainer } from "./modules/app/containers/ZAplicacionContainer";
import { ZListadoAplicacionesContainer } from "./modules/app/containers/ZListadoAplicacionesContainer";

import { Actions as zAplicationActions } from './modules/zaplicacion/actions'

import {

    //Utils
    EntityNormalizedObj,
    IZAplState,
    Constants

} from "./modules/zcommon";

console.log("Stage: " + process.env.NODE_ENV);

const middlewares = process.env.NODE_ENV != 'production' ?
    [immutableStateInvariant(), thunk] :
    [thunk];

declare let window: any;

let store = null

let idApl = ZUtils.Services.getQueryStringParameter('idApl');
let nomApl = ZUtils.Services.getQueryStringParameter('nomApl');
let username = sessionStorage.getItem(Constants.AZEN_USER_SESSION_KEY);
let lanzarMenu = ZUtils.Services.getQueryStringParameter('lanzarMenu');

let appInitialState = {
    azenURL: Constants.AZEN_URL
} as IZAplState;

const obtenerEstadoInicial = () => {
    
    //Es dev
    if (process.env.NODE_ENV != 'production') {
        appInitialState.nivelLog = 1;
        return createStore(
            App.Reducers.zaplState,
            appInitialState,
            redux.compose(redux.applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f)
        );
    }

    appInitialState.nivelLog = 0;
    return createStore(
        App.Reducers.zaplState,
        appInitialState,
        redux.compose(redux.applyMiddleware(...middlewares))
    );
}

if (idApl) {
    store = obtenerEstadoInicial();

    ReactDOM.render(
        <Provider store={store}>
            <ZAplicacionContainer />
        </Provider>,
        document.getElementById("app-container")
    );

    document.title = idApl;

    store.dispatch(zAplicationActions.lanzarAplicacion(idApl, nomApl, username, lanzarMenu));
}
else {

    store = createStore(
        App.Reducers.zaplState,
        appInitialState,
        redux.compose(redux.applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f)
    );

    ReactDOM.render(
        <Provider store={store}>
            <ZListadoAplicacionesContainer />
        </Provider>,
        document.getElementById("app-container")
    );
}