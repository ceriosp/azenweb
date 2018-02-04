
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
    Constants as ZCommonConstants,
    ContractsServices,
    IZEnviarComandoParams,
    IZParametrosComando

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
            zComandoFormaState: new EntityNormalizedObj(),
            zParametrosComando: {
                byId: {
                    [ZCommonConstants.ComandoEnum.CM_ACEPTAR]: {
                        id: ZCommonConstants.ComandoEnum.CM_ACEPTAR,
                        buffer: ""
                    }
                },
                allIds: [ZCommonConstants.ComandoEnum.CM_ACEPTAR]
            }
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
                    return u({
                        zCampoState: {
                            byId: {
                                [action.zcampoState.id]: {
                                    value: action.valor,
                                    haCambiado: true,
                                } as IZCampoState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE:
                    return onCampoRadioChange(state, action);

                case ActionTypes.ZPantexStateModule.ON_CAMPOCHECKBOXCHANGE:
                    return u({
                        zCampoState: {
                            byId: {
                                [action.zcampoState.id]: {
                                    checked: action.valor,
                                    haCambiado: true,
                                } as IZCampoState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

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

                case ActionTypes.ZPantexStateModule.SET_FILAMULTISELECCIONADA:
                    return u({
                        zFormaTablaState: {
                            byId: {
                                [action.zFormaTablaState.id]: {
                                    indexFilaMultiSeleccionada: action.indexFilaMultiSeleccionada
                                } as IZFormaTablaState
                            }
                        } as any,
                    } as IZPantexStateModule, state);

                case ActionTypes.ZPantexStateModule.SET_COMANDOBUFFER:
                    return u({
                        zParametrosComando: {
                            byId: {
                                [action.cm]: {
                                    buffer: action.buffer
                                } as IZParametrosComando
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

            const esDeMultiRegistro = action.hashZCampos.values().next().value.fi;

            const actualizarZCampo = (zcampoState: IZCampoState): IZCampoState => {
                if (action.listaPxCampos.indexOf(zcampoState.px) != -1) {

                    let key = zcampoState.nomCmp;
                    if (esDeMultiRegistro) {
                        key = ContractsServices.getSincHashCampo(zcampoState);
                    }

                    if (action.hashZCampos.has(key)) {
                        const zCampoEnHash = action.hashZCampos.get(key);

                        if (zCampoEnHash.fi) {
                            if (zcampoState.rg != zCampoEnHash.rg || zcampoState.fi != zCampoEnHash.fi) {
                                return zcampoState;
                            }
                        }

                        let zCampoActualizado = {

                            value: zCampoEnHash.value == undefined
                                ? zcampoState.value
                                : zCampoEnHash.value,

                            checked: zcampoState.checked,

                            control: zcampoState.control,
                            modo: zcampoState.modo

                        } as IZCampoState;

                        if (zcampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_RADIO
                            || zcampoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
                            if (zCampoEnHash.posBitsOn) {
                                if (zCampoEnHash.posBitsOn.indexOf(zcampoState.lon) != -1) {
                                    zCampoActualizado.checked = true;
                                } else {
                                    zCampoActualizado.checked = false;
                                }
                            }
                        }

                        if (zCampoEnHash.bitPrenderControl) {
                            zCampoActualizado.control = ContractsServices.Binario.prenderBit(zcampoState.control, zCampoEnHash.bitPrenderControl);
                        }

                        if (zCampoEnHash.bitApagarControl) {
                            zCampoActualizado.control = ContractsServices.Binario.apagarBit(zcampoState.control, zCampoEnHash.bitApagarControl);
                        }

                        if (zCampoEnHash.bitPrenderModo) {
                            zCampoActualizado.modo = ContractsServices.Binario.prenderBit(zcampoState.modo, zCampoEnHash.bitPrenderModo);
                        }

                        if (zCampoEnHash.bitApagarModo) {
                            zCampoActualizado.modo = ContractsServices.Binario.apagarBit(zcampoState.modo, zCampoEnHash.bitApagarModo);
                        }

                        return u({
                            value: zCampoActualizado.value,
                            checked: zCampoActualizado.checked, //para radio/checkbox
                            control: zCampoActualizado.control,
                            modo: zCampoActualizado.modo,
                            readOnly: ContractsServices.esCampoControlLectura(zCampoActualizado.control)
                                || ContractsServices.esCampoModoLectura(zCampoActualizado.modo),

                            //controlCampo: zCampoActualizado.controlCampo,
                            //modoCampo: zCampoActualizado.modoCampo,
                            //readOnly: ZCommon.Services.esCampoModoLectura(zCampoActualizado.modoCampo)
                            //    || ZCommon.Services.esCampoControlLectura(zCampoActualizado.controlCampo)

                        } as IZCampoState, zcampoState);
                    }
                }

                return zcampoState;
            }

            const actualizarBoton = (zcomandoFormaState: IZComandoFormaState): IZComandoFormaState => {

                if (action.listaPxComandos.indexOf(zcomandoFormaState.px) != -1) {
                    if (action.hashZComandos.has(zcomandoFormaState.cmd)) {
                        const zComandoFormaEnHash = action.hashZComandos.get(zcomandoFormaState.cmd);
                        return u({
                            desh: 0//zComandoFormaEnHash.desh
                        } as IZComandoFormaState, zcomandoFormaState);
                    }
                }

                return zcomandoFormaState;
            }

            if (action.hashZCampos.size > 0) {
                return u({
                    zCampoState: {
                        byId: u.map(actualizarZCampo)
                    } as any,
                    zComandoFormaState: {
                        byId: u.map(actualizarBoton)
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

