
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
    Services as ZUtilsServices
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
        const zPantexStateModuleInicial = {
            pilaPx: [],
            pxAlTope: -1,
            ponerModal: false,
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
                        pilaPx: [...state.pilaPx, action.px],
                        pxAlTope: action.px,
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

                case ActionTypes.ZPantexStateModule.CM_PONERMODAL:
                    return u({
                        ponerModal: action.ponerModal
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.CM_PXARRIVAR:                   
                    let indicePxArrivar = state.pilaPx.indexOf(parseInt(action.pxArrivarParams.px.toString()));
                    //Es diferente del último en la pila, se debe reacomodar
                    if (indicePxArrivar != -1 &&
                        state.pilaPx[indicePxArrivar] != state.pilaPx[state.pilaPx.length - 1]) {
                        return u({
                            pilaPx: ZUtilsServices.Inmutable.intercambiarElementosArray(state.pilaPx, state.pilaPx[indicePxArrivar], state.pilaPx[state.pilaPx.length - 1]),
                            pxAlTope: action.pxArrivarParams.px
                        } as IZPantexStateModule, state);
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

