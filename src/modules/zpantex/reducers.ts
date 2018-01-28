
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
    IZPantexState,
    IZPantexStateModule,
    IZFormaTablaState,
    IZCampoState,
    IZComandoFormaState,
    IZVentanaState,

} from '../zcommon';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zpantex";

import {
    Services as UtilsServices
} from "../zutils";

import { ActionTypes } from './actionTypes';
import { debug, debuglog } from 'util';
import { start } from 'repl';
import { ZVentana } from './components/ZVentana';

export namespace Reducers {

    export namespace ZPantexModule {

        const zPantexModule = {
            pilaPantex: [],
            pxAlTope: -1,
            esPxModal: false,
        } as IZPantexModule;

        export const impl = (state: IZPantexModule = zPantexModule, action: ActionTypes.ZPantexModule.Action) => {

            let indxZPantex = 0;
            switch (action.type) {
                case ActionTypes.ZPantexModule.CM_PXCREAR:

                    indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.zPantex.numPx
                        }
                    );

                    if (indxZPantex == -1) {
                        return u({
                            pilaPantex: [...state.pilaPantex, action.zPantex],
                            pxAlTope: action.zPantex.numPx,
                        } as IZPantexModule, state);
                    }
                    break;

                case ActionTypes.ZPantexModule.CM_PXARRIVAR:

                    indxZPantex = state.pilaPantex.findIndex(
                        (zPantexi: IZPantex) => {
                            return zPantexi.numPx == action.pxArrivar.px
                        }
                    );

                    if (indxZPantex != state.pilaPantex.length - 1) { //Para no renderizar dos veces con CM_PXCREAR y CM_PXARRIVAR
                        let clonPilaPantex = JSON.parse(JSON.stringify(state.pilaPantex));
                        let zPantex: IZPantex = clonPilaPantex[indxZPantex];
                        let newPilaPantex = clonPilaPantex.slice(0, indxZPantex).concat(clonPilaPantex.slice(indxZPantex + 1));
                        newPilaPantex = [...newPilaPantex, zPantex];
                        return u({
                            pxAlTope: action.pxArrivar.px,
                            pilaPantex: newPilaPantex
                        } as IZPantexModule, state);
                    }
                    break;

                case ActionTypes.ZPantexModule.SET_ESPXMODAL:
                    return u({
                        esPxModal: action.esPxModal
                    } as IZPantexModule, state);

                case ActionTypes.ZPantexModule.PX_DESTRUIR: {
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
                        pilaPantex: pilaPantex.slice(0, indxZPantex).concat(pilaPantex.slice(indxZPantex + 1)),
                    } as IZPantexModule, state);
                }
            }

            return state;
        }
    }

    export namespace ZPantexStateModule {

        namespace ZPantexState {

            const byId = (state: EntityMap<IZPantexState> = new EntityMap<IZPantexState>(), action: ActionTypes.ZPantexState.Action): EntityMap<IZPantexState> => {

                switch (action.type) {

                    case ActionTypes.ZPantexState.STORE:
                        return UtilsServices.storeById<IZPantexState>(state, action.zPantexState);

                    case ActionTypes.ZPantexState.REMOVE:
                        return UtilsServices.removeById<IZPantexState>(state, action.id);

                    case ActionTypes.ZPantexState.ADD_ZFT:
                        return u({
                            [action.id]: {
                                zFormaTablaStateListIds: [...state[action.id].zFormaTablaStateListIds, action.newZftId]
                            } as IZPantexState
                        } as EntityMap<IZPantexState>, state);
                }

                return state;
            }

            const allIds = (state: Array<number> = new Array<number>(), action: ActionTypes.ZPantexState.Action): Array<number> => {

                switch (action.type) {
                    case ActionTypes.ZPantexState.STORE:
                        return UtilsServices.storeByAllIds(state, action.zPantexState);

                    case ActionTypes.ZPantexState.REMOVE:
                        return UtilsServices.removeByAllIds(state, action.id);
                }

                return state;
            }

            export const impl: Reducer<EntityNormalizedObj<IZPantexState>> = combineReducers<EntityNormalizedObj<IZPantexState>>({
                byId,
                allIds
            });
        }

        namespace ZFormaTablaState {

            const byId = (state: EntityMap<IZFormaTablaState> = new EntityMap<IZFormaTablaState>(), action: ActionTypes.ZFormaTablaState.Action): EntityMap<IZFormaTablaState> => {

                switch (action.type) {

                    case ActionTypes.ZFormaTablaState.STORE:
                        return UtilsServices.storeById<IZFormaTablaState>(state, action.zFormaTablaState);

                    case ActionTypes.ZFormaTablaState.REMOVE:
                        return UtilsServices.removeById<IZFormaTablaState>(state, action.id);

                    case ActionTypes.ZFormaTablaState.SET_IDZVENTANA:
                        return u({
                            [action.id]: {
                                idZVentana: action.zventanaId
                            } as IZFormaTablaState
                        } as EntityMap<IZFormaTablaState>, state);

                    case ActionTypes.ZFormaTablaState.ADD_ZCAMPO:
                        return u({
                            [action.id]: {
                                zCampoStateListIds: [...state[action.id].zCampoStateListIds, action.zcampoId]
                            } as IZFormaTablaState
                        } as EntityMap<IZFormaTablaState>, state);

                    case ActionTypes.ZFormaTablaState.ADD_COMANDO_LINEST:
                        return u({
                            [action.id]: {
                                linEstListIds: [...state[action.id].linEstListIds, action.zcomandoId]
                            } as IZFormaTablaState
                        } as EntityMap<IZFormaTablaState>, state);

                    case ActionTypes.ZFormaTablaState.ADD_COMANDO_BTNS:
                        return u({
                            [action.id]: {
                                btnsListIds: [...state[action.id].btnsListIds, action.zcomandoId]
                            } as IZFormaTablaState
                        } as EntityMap<IZFormaTablaState>, state);

                }

                return state;
            }

            const allIds = (state: Array<number> = new Array<number>(), action: ActionTypes.ZFormaTablaState.Action): Array<number> => {

                switch (action.type) {
                    case ActionTypes.ZFormaTablaState.STORE:
                        return UtilsServices.storeByAllIds(state, action.zFormaTablaState);

                    case ActionTypes.ZFormaTablaState.REMOVE:
                        return UtilsServices.removeByAllIds(state, action.id);
                }

                return state;
            }

            export const impl: Reducer<EntityNormalizedObj<IZFormaTablaState>> = combineReducers<EntityNormalizedObj<IZFormaTablaState>>({
                byId,
                allIds
            });
        }

        namespace ZCampoState {
            const byId = (state: EntityMap<IZCampoState> = new EntityMap<IZCampoState>(), action: ActionTypes.ZCampoState.Action): EntityMap<IZCampoState> => {

                switch (action.type) {

                    case ActionTypes.ZCampoState.STORE:
                        return UtilsServices.storeById<IZCampoState>(state, action.zCampoState);

                    case ActionTypes.ZCampoState.REMOVE:
                        return UtilsServices.removeById<IZCampoState>(state, action.id);

                }

                return state;
            }

            const allIds = (state: Array<number> = new Array<number>(), action: ActionTypes.ZCampoState.Action): Array<number> => {

                switch (action.type) {
                    case ActionTypes.ZCampoState.STORE:
                        return UtilsServices.storeByAllIds(state, action.zCampoState);

                    case ActionTypes.ZCampoState.REMOVE:
                        return UtilsServices.removeByAllIds(state, action.id);
                }

                return state;
            }

            export const impl: Reducer<EntityNormalizedObj<IZCampoState>> = combineReducers<EntityNormalizedObj<IZCampoState>>({
                byId,
                allIds
            });
        }

        namespace ZComandoFormaState {
            const byId = (state: EntityMap<IZComandoFormaState> = new EntityMap<IZComandoFormaState>(), action: ActionTypes.ZComandoFormaState.Action): EntityMap<IZComandoFormaState> => {

                switch (action.type) {

                    case ActionTypes.ZComandoFormaState.STORE:
                        return UtilsServices.storeById<IZComandoFormaState>(state, action.zComandoFormaState);

                    case ActionTypes.ZComandoFormaState.REMOVE:
                        return UtilsServices.removeById<IZComandoFormaState>(state, action.id);

                }

                return state;
            }

            const allIds = (state: Array<number> = new Array<number>(), action: ActionTypes.ZComandoFormaState.Action): Array<number> => {

                switch (action.type) {
                    case ActionTypes.ZComandoFormaState.STORE:
                        return UtilsServices.storeByAllIds(state, action.zComandoFormaState);

                    case ActionTypes.ZComandoFormaState.REMOVE:
                        return UtilsServices.removeByAllIds(state, action.id);
                }

                return state;
            }

            export const impl: Reducer<EntityNormalizedObj<IZComandoFormaState>> = combineReducers<EntityNormalizedObj<IZComandoFormaState>>({
                byId,
                allIds
            });
        }

        namespace ZVentanaState {
            const byId = (state: EntityMap<IZVentanaState> = new EntityMap<IZVentanaState>(), action: ActionTypes.ZVentanaState.Action): EntityMap<IZVentanaState> => {

                switch (action.type) {

                    case ActionTypes.ZVentanaState.STORE:
                        return UtilsServices.storeById<IZVentanaState>(state, action.zVentanaState);

                    case ActionTypes.ZVentanaState.REMOVE:
                        return UtilsServices.removeById<IZVentanaState>(state, action.id);

                }

                return state;
            }

            const allIds = (state: Array<number> = new Array<number>(), action: ActionTypes.ZVentanaState.Action): Array<number> => {

                switch (action.type) {
                    case ActionTypes.ZVentanaState.STORE:
                        return UtilsServices.storeByAllIds(state, action.zVentanaState);

                    case ActionTypes.ZVentanaState.REMOVE:
                        return UtilsServices.removeByAllIds(state, action.id);
                }

                return state;
            }

            export const impl: Reducer<EntityNormalizedObj<IZVentanaState>> = combineReducers<EntityNormalizedObj<IZVentanaState>>({
                byId,
                allIds
            });
        }

        export const implOld: Reducer<IZPantexStateModule> = combineReducers<IZPantexStateModule>({
            pilaPantexState: ZPantexState.impl,
            zFormaTablaState: ZFormaTablaState.impl,
            zCampoState: ZCampoState.impl,
            zComandoFormaState: ZComandoFormaState.impl,
            zVentanaState: ZVentanaState.impl
        });

        const zPantexStateModuleInicial = {
            pilaPx:[],
            pxAlTope:-1,
            pilaPantexState: new EntityNormalizedObj(),
            zFormaTablaState: new EntityNormalizedObj(),
            zVentanaState: new EntityNormalizedObj(),
            zCampoState: new EntityNormalizedObj(),
            zComandoFormaState: new EntityNormalizedObj()
        } as IZPantexStateModule;

        export const impl = (state: IZPantexStateModule = zPantexStateModuleInicial, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            switch (action.type) {

                case ActionTypes.ZPantexStateModule.CM_PXCREAR:
                    return {
                        pilaPx:[...state.pilaPx, action.px],
                        pxAlTope:action.px,
                        pilaPantexState: {
                            byId: { ...state.pilaPantexState.byId, ...action.pilaPantexState.byId },
                            allIds: [...state.pilaPantexState.allIds, ...action.pilaPantexState.allIds],
                        },
                        zFormaTablaState: {
                            byId: { ...state.zFormaTablaState.byId, ...action.zFormaTablaState.byId },
                            allIds: [...state.zFormaTablaState.allIds, ...action.zFormaTablaState.allIds],
                        },
                        zVentanaState: {
                            byId: { ...state.zVentanaState.byId, ...action.zVentanaState.byId },
                            allIds: [...state.zVentanaState.allIds, ...action.zVentanaState.allIds],
                        },                        
                        zCampoState: {
                            byId: { ...state.zCampoState.byId, ...action.zCampoState.byId },
                            allIds: [...state.zCampoState.allIds, ...action.zCampoState.allIds],
                        },                                           
                        zComandoFormaState: {
                            byId: { ...state.zComandoFormaState.byId, ...action.zComandoFormaState.byId },
                            allIds: [...state.zComandoFormaState.allIds, ...action.zComandoFormaState.allIds],
                        },                                                             
                    } as IZPantexStateModule;
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

