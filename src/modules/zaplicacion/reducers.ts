
import { Reducer, combineReducers } from 'redux';

import * as ZCommon from '../zcommon';
import {

    //models
    ZMenuModel,
    ZMenuItemModel,

    ZRecursoModel,
    ZRecursoViewModel,

    //state
    ZAplicationState,

    //Utils
    EntityNormalizedObj

} from '../zcommon';

import * as ZRecursos from '../zrecursos';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zrecursos";

import * as ZAplication from './index';

export namespace Reducers {
    
    export const ZAplicacionReducer: Reducer<any> = combineReducers({
        mostrandoVentanaModal:()=>{ return {}; },
        recursosZoomViewModel:()=>{ return {}; },
        recursosViewModel: ZRecursos.Reducers.recursosViewModelReducer,        
    });

}

