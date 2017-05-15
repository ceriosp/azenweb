import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import {Action, Dispatch, Middleware, Store as ReduxStore} from 'redux';
import { Provider } from 'react-redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {Button} from 'react-bootstrap';
import "es6-string-polyfills";
require('es6-object-assign').polyfill();

/*
import * as $ from "jquery";
import 'bootstrap';
*/

import {

    //Models
    ZRecursoModel,
    ZCampoModel,

    //Components
    ZAplicacion,

    //Constants
    RecursosConstants
} from "./modules/recursos/";

ReactDOM.render(
    <ZAplicacion/>,
    document.getElementById("app-container")
);