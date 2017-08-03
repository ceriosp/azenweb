
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
    EntityNormalizedObj,

} from '../zcommon';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zrecursos";

import { ActionTypes } from './actionTypes';

export namespace Reducers {

    export namespace recursosViewModel {

        const initialState = new EntityMap<ZRecursoViewModel>();

        const byId = (state: EntityMap<ZRecursoViewModel> = initialState, action: ActionTypes.Action): EntityMap<ZRecursoViewModel> => {
            

            switch (action.type) {

                case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:                
                    return byIdDespacharOpcionMenu(state, action);

                default:
                    return state;
            }
        }

        const allIds = (state: Array<string> = [], action: ActionTypes.Action): Array<string> => {

            switch (action.type) {
                case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:
                    if(state.indexOf(action.zmenuItemModel.ctx) != -1){
                        return state;
                    }
                    return [action.zmenuItemModel.ctx, ...state];

                default:
                    return state;
            }
        }

        const byIdDespacharOpcionMenu = (state: EntityMap<ZRecursoViewModel> = initialState, action: ActionTypes.Action): EntityMap<ZRecursoViewModel> => {

            if (action.type != ZMenu.ActionTypes.DESPACHAR_OPCION_MENU) {
                return state;
            }

            let zrecursosService = new Services.ZRecursoServices();

            return zrecursosService.despacharOpcionMenu({
                idRecurso: action.zmenuItemModel.ctx,
                tipoRecurso: ZCommon.Constants.TipoRecurso.Basico,
                zrecursoViewModelEntityMapOld: state
            });
        }

        export const recursosViewModel = combineReducers<EntityNormalizedObj<ZRecursoViewModel>>({
            byId,
            allIds
        });
    }
}

