
import { Reducer, combineReducers } from 'redux';

import * as ZCommon from '../zcommon';
import {

    //models
    ZMenuModel,
    ZMenuItemModel,

    ZRecursoModel,
    ZRecursoViewModel,

    //Utils
    EntityMap,

} from '../zcommon';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zrecursos";

import { ActionTypes } from './actionTypes';

export namespace Reducers {

    const initialState = new EntityMap<ZRecursoViewModel>();

    const recursosViewModelByIdReducer = (state: EntityMap<ZRecursoViewModel> = initialState, action: ActionTypes.Action): EntityMap<ZRecursoViewModel> => {
                
        switch (action.type) {

            case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:                
                return despacharOpcionMenu(state, action);

            default:
                return state;                
        }
    }

    const despacharOpcionMenu = (state: EntityMap<ZRecursoViewModel> = initialState, action: ActionTypes.Action): EntityMap<ZRecursoViewModel> => {

        if (action.type != ZMenu.ActionTypes.DESPACHAR_OPCION_MENU) {
            return state;
        }

        let zrecursosService = new Services.ZRecursoServices();

        return zrecursosService.despacharOpcionMenu({
            idRecurso: action.zmenuItemModel.ctx,
            tipoRecurso: ZCommon.Constants.TipoRecurso.Basico,
            zrecursoViewModelEntityMap: state
        });
    }

    const allRecursosViewModelReducer = (state: Array<string> = [], action: ActionTypes.Action): Array<string> => {      
        
        switch (action.type) {
            case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:                
                return [action.zmenuItemModel.ctx, ...state];

            default:
                return state;
        }
}

export const recursosViewModelReducer: Reducer<any> = combineReducers({
    byId: recursosViewModelByIdReducer,
    allIds: allRecursosViewModelReducer
});
}

