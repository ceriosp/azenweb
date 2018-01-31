
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
    ZCampoState,
    Constants as ZCommonConstants

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
                    return cmPxCrear(state, action);

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
                    break;

                case ActionTypes.ZPantexStateModule.CM_PXDESTRUIR:
                    let indicePxDestruir = state.pilaPx.indexOf(parseInt(action.pxDestruirParams.px.toString()));
                    if (indicePxDestruir != -1) {
                        return u({
                            pilaPx: state.pilaPx.slice(0, indicePxDestruir).concat(state.pilaPx.slice(indicePxDestruir + 1)),
                            pxAlTope: state.pilaPx.length > 1 ? state.pilaPx[state.pilaPx.length - 2] : -1
                        } as IZPantexStateModule, state);
                    }
                    break;

                case ActionTypes.ZPantexStateModule.CM_SINCCAMPO:
                    return cmSincCampo(state, action);

                case ActionTypes.ZPantexStateModule.ON_CAMPOCHANGE:
                    const zCampoState = state.zCampoState.byId[action.zcampoState.id];

                    let valorRadioOChequeo: boolean = undefined;
                    if (zCampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_RADIO) {
                        valorRadioOChequeo = action.valor == "*";
                    } else if (zCampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
                        valorRadioOChequeo = action.valor == "X";
                    }
                    return u({
                        zCampoState: {
                            byId: {
                                [action.zcampoState.id]: {
                                    value: valorRadioOChequeo ? zCampoState.value : action.valor,
                                    haCambiado: true,
                                    checked: valorRadioOChequeo
                                } as IZCampoState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE:
                    return onCampoRadioChange(state, action);

                case ActionTypes.ZPantexStateModule.SET_ZCAMPOSTATE_HACAMBIADO:
                    return u({
                        zCampoState: {
                            byId: {
                                [action.idZCampoState]: {
                                    haCambiado: action.haCambiado,
                                } as IZCampoState
                            }
                        } as any,
                    } as IZPantexStateModule, state);
            }

            return state;
        }

        const cmPxCrear = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {
            if (action.type != ActionTypes.ZPantexStateModule.CM_PXCREAR) {
                return state;
            }
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
                } as EntityNormalizedObj<IZCampoState>,
                zComandoFormaState: {
                    byId: { ...state.zComandoFormaState.byId, ...action.zComandoFormaState.byId },
                    allIds: [...state.zComandoFormaState.allIds, ...action.zComandoFormaState.allIds],
                },
            } as IZPantexStateModule;
        }

        const cmSincCampo = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.CM_SINCCAMPO) {
                return state;
            }

            const actualizarDefinicionCampo = (zcampoState: IZCampoState): IZCampoState => {

                if (zcampoState.px == action.px) {
                    if (action.hashDefinicionCampos.has(zcampoState.nomCmp)) {
                        const zCampoEnHash = action.hashDefinicionCampos.get(zcampoState.nomCmp);
                        let zCampoActualizado = {

                            value: zCampoEnHash.value == undefined
                                ? zcampoState.value
                                : zCampoEnHash.value,

                            controlCampo:
                                zCampoEnHash.controlCampo == undefined
                                    ? zcampoState.controlCampo
                                    : zCampoEnHash.controlCampo,

                            modoCampo:
                                zCampoEnHash.modoCampo == undefined
                                    ? zcampoState.modoCampo
                                    : zCampoEnHash.modoCampo,

                        } as IZCampoState;

                        if (zcampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_RADIO
                            || zcampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
                            if (zCampoEnHash.posBitsOn
                                && zCampoEnHash.posBitsOn.indexOf(zcampoState.lon) != -1) {
                                zCampoActualizado.checked = true;
                            }
                        }

                        return u({
                            value: zCampoActualizado.value,
                            checked: zCampoActualizado.checked, //para radio/checkbox
                            controlCampo: zCampoActualizado.controlCampo,
                            modoCampo: zCampoActualizado.modoCampo,
                            readOnly:
                                zCampoActualizado.controlCampo == ZCommonConstants.ControlCampoEnum.ZCMP_VISUAL
                                || zCampoActualizado.modoCampo == ZCommonConstants.ModoCampoEnum.ZCMP_MSOLOVISUAL
                                || zCampoActualizado.modoCampo == ZCommonConstants.ModoCampoEnum.ZCMP_MNOARRIVABLE

                        } as IZCampoState, zcampoState);
                    }
                }

                return zcampoState;
            }

            if (action.hashDefinicionCampos.size > 0) {
                return u({
                    zCampoState: {
                        byId: u.map(actualizarDefinicionCampo)
                    } as any,
                } as IZPantexStateModule, state);
            }
        }

        const onCampoRadioChange = (state: IZPantexStateModule, action: ActionTypes.ZPantexStateModule.Action): IZPantexStateModule => {

            if (action.type != ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE) {
                return state;
            }

            let zcampoRadioPadre: IZCampoState = state.zCampoState.byId[action.zcampoState.parentId];
            if (!zcampoRadioPadre) {
                console.error("Campo " + action.zcampoState.nomCmp + " no tiene parentId asociado");
                return state;
            }

            const actualizarCamposRadios = (zcampoState: IZCampoState): IZCampoState => {

                if (zcampoState.px == action.zcampoState.px) {
                    if (zcampoState.parentId == zcampoRadioPadre.id) {
                        if (zcampoState.id == action.zcampoState.id) {
                            return u({                                
                                checked: true,
                            } as IZCampoState, zcampoState);
                        }
                        return u({
                            checked: false,
                        } as IZCampoState, zcampoState);
                    }
                }

                return zcampoState;
            }

            return u({
                zCampoState: {
                    byId: u.map(actualizarCamposRadios)
                } as any,
            } as IZPantexStateModule, state);
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

