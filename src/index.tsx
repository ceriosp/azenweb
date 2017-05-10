import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as redux from 'redux';
import {Action, Dispatch, Middleware, Store as ReduxStore} from 'redux';
import { Provider } from 'react-redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {Button} from 'react-bootstrap';

import {

    //Models
    ZRecursoModel,
    ZCampoModel,

    //Components
    ZCampo,
    ZRecurso,

    //Constants
    RecursosConstants
} from "./modules/recursos/";


/*
ReactDOM.render(
    <ZCampo zCampoModel={ {etq:"Código", claseInd:RecursosConstants.CAMPO_RADIO} as ZCampoModel }/>,
    document.getElementById("app-container")
);
*/

ReactDOM.render(
    <ZRecurso zRecursoModel={ 
        {
            ven:{
                descr:"Tercero",
                nfils:17,
                ncols:17
            },
            camps:[
                {etq:"Código         :", filEtq:0, colEtq:0, filCam:0, colCam:4, claseInd:RecursosConstants.CAMPO_TEXTO},
                {etq:"Identificación :", filEtq:0, colEtq:5, filCam:0, colCam:10, claseInd:RecursosConstants.CAMPO_TEXTO}
            ]
        } as ZRecursoModel }/>,
    document.getElementById("app-container")
);
