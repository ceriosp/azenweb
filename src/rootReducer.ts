import { combineReducers } from 'redux';

import * as ZAplicacion from './modules/zaplicacion/';

export const combinedReducers = combineReducers({

    //la llave de la propiedad debe estar en el State general de la aplicación. Ej:
    //State = { zaplicationState : {} }
    zaplicationState: ZAplicacion.ZAplicacionReducer
});