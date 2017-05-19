import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import {Action, Dispatch, Middleware, Store as ReduxStore} from 'redux';
import { Provider } from 'react-redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {Button} from 'react-bootstrap';
import "es6-string-polyfills";
require('es6-object-assign').polyfill();

import {

    //Models

    //Components
    ZAplicacion,

    //Constants

} from "./modules/aplicacion";

ReactDOM.render(
    <div><ZAplicacion/></div>,
    document.getElementById("app-container")
);