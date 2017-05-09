import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import {Action, Dispatch, Middleware, Store as ReduxStore} from 'redux';
import { Provider } from 'react-redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {Button} from 'react-bootstrap';

import {
    ZCampo,
    ZInput
} from "./modules/recursos/";


ReactDOM.render(
    <ZInput zCampo={ {etq:"Código"} as ZCampo }/>,
    document.getElementById("app-container")
);