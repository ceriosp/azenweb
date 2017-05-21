import { Reducer } from 'redux';

import {
    ZMenuModel
} from "../zmenu";

import {
    ZRecursoModel,
    ZRecursoViewModel
} from "../zrecursos";

import { ZAplicacion } from './constants';

import { ZAplicacionState } from './model';

const initialState: ZAplicacionState = {
    zmenuModel: new ZMenuModel(),
    mapRecursosIndxByCtx: new Map<string, ZRecursoViewModel>(),
    recursosActivosIds: Array<string>()
}


const zaplicacionReducer: Reducer<ZAplicacionState> =
    (state: ZAplicacionState = initialState, action: ZAplicacion.Action): ZAplicacionState => {

        switch (action.type) {
            case ZAplicacion.ActionTypes.DESPACHAR_RECURSO:
                return state;

            default:
                return state;
        }
    }




