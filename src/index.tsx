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

    //Models
    ZRecursoViewModel,
    State,

    //Utils
    EntityNormalizedObj,
    IZAplState,

} from "./modules/zcommon";

declare const __DEV__: boolean; // from webpack
if (__DEV__) {
    console.log("dev stage");
}

const middlewares = __DEV__ ?
    [immutableStateInvariant(), thunk] :
    [thunk];

declare let window: any;

let store = null

let idApl = ZUtils.Services.getQueryStringParameter('idApl');
let nomApl = ZUtils.Services.getQueryStringParameter('nomApl');
let lanzarMenu = ZUtils.Services.getQueryStringParameter('lanzarMenu');

const obtenerEstadoInicial = () => {

    if (__DEV__) {
        return createStore(
            App.Reducers.zaplState,
            redux.compose(redux.applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f)
        );
    }

    return createStore(
        App.Reducers.zaplState,
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

    store.dispatch(zAplicationActions.lanzarAplicacion(idApl, nomApl, lanzarMenu));
}
else {

    store = createStore(
        App.Reducers.zaplState,
        redux.compose(redux.applyMiddleware(...middlewares), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f)
    );

    ReactDOM.render(
        <Provider store={store}>
            <ZListadoAplicacionesContainer />
        </Provider>,
        document.getElementById("app-container")
    );
}