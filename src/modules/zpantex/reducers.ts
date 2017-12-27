
import { Reducer, combineReducers } from 'redux';
const u = require('updeep');

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
    IZPantexModule,
    IZPantex,

} from '../zcommon';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zpantex";

import { ActionTypes } from './actionTypes';

export namespace Reducers {

    export namespace ZPantexModule {

        const zPantexModule = {
            pilaPantex: [],
            pxAlTope: -1,
            esPxModal: false
        } as IZPantexModule;

        export const impl = (state: IZPantexModule = zPantexModule, action: ActionTypes.ZPantexModule.Action) => {

            switch (action.type) {

                case ActionTypes.ZPantexModule.PONER_AL_TOPE:{

                    const pilaPantex = state.pilaPantex;

                    const indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.zPantex.numPx
                        }
                    );

                    if (indxZPantex == -1) {
                        return u({
                            pilaPantex: [...pilaPantex, action.zPantex],
                            pxAlTope: action.zPantex.numPx
                        } as IZPantexModule, state);
                    }

                    return u({
                        pxAlTope: action.zPantex.numPx
                    } as IZPantexModule, state);

                }

                case ActionTypes.ZPantexModule.SET_ESPXMODAL:
                    return u({
                        esPxModal: action.esPxModal
                    } as IZPantexModule, state);

                case ActionTypes.ZPantexModule.PX_DESTRUIR:{
                    const pilaPantex = state.pilaPantex;

                    const indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.pxDestruirParams.px
                        }
                    );

                    if (indxZPantex == -1) {
                        console.error("zPantex/reducers: px no encontrado");
                        return state;
                    }

                    return u({
                        pilaPantex: pilaPantex.slice(0,indxZPantex).concat(pilaPantex.slice(indxZPantex+1)),                        
                    } as IZPantexModule, state);
                }
            }

            return state;
        }
    }






















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
                    if (state.indexOf(action.zmenuItemModel.ctx) != -1) {
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
            byId: byId as any,
            allIds: allIds as any
        });
    }
}

