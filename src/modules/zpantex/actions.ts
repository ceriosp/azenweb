import * as ZCommon from "../zcommon";
import {

    //Models
    ZMenuItemModel,
    ZRecursoViewModel,
    ZReferenciaViewModel,

    //Utils
    EntityMap,
    EntityNormalizedObj,
    IZAplState,
    IZPantex,
    Constants,
    CM,
    IZPantexState,
    IZFormaTablaState,
    IZCampoState,
    IZPantexModule,
    ZPantexState as ZPantexStateModel,
    ZFormaTablaState as ZFormaTablaStateModel,
    ZCampoState as ZCampoStateModel,
    ZComandoFormaState as ZComandoFormaStateModel,
    ZVentanaState as ZVentanaStateModel,
    IZFormaTabla,
    IZComandoFormaState,
    IZVentanaState,
    ZFormaTablaState,
    ZComandoFormaState,
    ZVentanaModel,

} from "../zcommon";

import * as ZMenu from '../zmenu';

import {
    ActionTypes,
} from './actionTypes';
import { ResultadoAction, ResultadoActionConDato, Constants as ZUtilsConstants } from "../zutils";

import { Actions as ZAplicacionAction } from "../zaplicacion/actions";
import { Selectors } from "./selectors";

export namespace DTO {
    export class DespacharOpcionMenuParamsDTO {
        tipoRecurso: ZCommon.Constants.TipoRecurso;
        idRecurso: string;
        zrecursoViewModelEntityMapOld: EntityMap<ZRecursoViewModel>;
    }
}

export namespace Actions {

    export namespace ZPantexModule {

        export const pxCrear = (zPantex: IZPantex) => (dispatch: any, getStateFn: () => IZAplState) => {

            //dispatch(lanzarPxCrear(zPantex));

            let zFormaTablaState: EntityNormalizedObj<ZFormaTablaState> = new EntityNormalizedObj();
            let zVentanaState: EntityNormalizedObj<IZVentanaState> = new EntityNormalizedObj();
            let zCampoState: EntityNormalizedObj<IZCampoState> = new EntityNormalizedObj();
            let zComandoFormaState: EntityNormalizedObj<IZComandoFormaState> = new EntityNormalizedObj();

            agregarZFormaTablasState(getStateFn, zPantex, zFormaTablaState, zVentanaState, zCampoState, zComandoFormaState);

            let pilaPantexState = {
                byId: {
                    [zPantex.numPx]: {
                        id: zPantex.numPx,
                        zFormaTablaStateListIds: zFormaTablaState.allIds
                    } as IZPantexState,
                } as EntityMap<IZPantexState>,
                allIds: [zPantex.numPx]
            } as EntityNormalizedObj<IZPantexState>;

            dispatch(cmPxCrear(zPantex.numPx,
                pilaPantexState,
                zFormaTablaState,
                zVentanaState,
                zCampoState,
                zComandoFormaState));
            /*            
            let zPantexState = new ZPantexStateModel(zPantex.numPx);
            dispatch(ZPantexStateModule.ZPantexState.adicionar(zPantexState));
            dispatch(ZPantexStateModule.ZPantexState.agregarZfts(zPantex));
            */
        }

        const agregarZFormaTablasState = (getStateFn: () => IZAplState,
            zPantex: IZPantex,
            zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
            zVentanaState: EntityNormalizedObj<IZVentanaState>,
            zCampoState: EntityNormalizedObj<IZCampoState>,
            zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>) => {

            let id = Selectors.ZPantexStateModule.ZFormaTablaState.getNextZFormaTablaStateId(getStateFn());
            for (let i = 0; i < zPantex.zFormaTablaList.length; i++) {
                zFormaTablaState.byId[id] = new ZFormaTablaStateModel(id);

                zFormaTablaState.byId[id].idZVentana =
                    agregarZVentanaState(getStateFn, zPantex.zFormaTablaList[i], zVentanaState);

                zFormaTablaState.byId[id].zCampoStateListIds =
                    agregarZCamposState(getStateFn, zPantex.zFormaTablaList[i], zCampoState);

                zFormaTablaState.byId[id].btnsListIds =
                    agregarZComandosBtnsFormaState(getStateFn, zPantex.zFormaTablaList[i], zComandoFormaState);

                zFormaTablaState.byId[id].linEstListIds =
                    agregarZComandosLinEstFormaState(getStateFn, zPantex.zFormaTablaList[i], zComandoFormaState);

                zFormaTablaState.allIds.push(id);

                id++;
            }
        }

        const agregarZVentanaState = (getStateFn: () => IZAplState,
            zFormaTabla: IZFormaTabla,
            zVentanaState: EntityNormalizedObj<IZVentanaState>): number => {

            let zFormaTablaVenId: number = undefined;

            if (!zFormaTabla.ven) {
                return zFormaTablaVenId;
            }

            zFormaTablaVenId = Selectors.ZPantexStateModule.ZVentanaState.getNextZVentanaStateId(getStateFn());
            zVentanaState.byId[zFormaTablaVenId] = new ZVentanaStateModel(zFormaTabla.ven, zFormaTablaVenId);
            zVentanaState.allIds.push(zFormaTablaVenId);

            return zFormaTablaVenId;
        }

        const agregarZCamposState = (getStateFn: () => IZAplState,
            zFormaTabla: IZFormaTabla,
            zCampoState: EntityNormalizedObj<IZCampoState>): Array<number> => {

            let zFormaTablaCmpsIds = [];

            let id = Selectors.ZPantexStateModule.ZCampoState.getNextZCampoStateId(getStateFn());
            for (let i = 0; i < zFormaTabla.cmps.length; i++) {
                zCampoState.byId[id] = new ZCampoStateModel(zFormaTabla.cmps[i], id);
                zCampoState.allIds.push(id);
                zFormaTablaCmpsIds.push(id);
                if (zFormaTabla.cmps[i].cmps) {
                    let parentId = id;
                    zCampoState.byId[id].esCampoGrafico = true;
                    for (let j = 0; j < zFormaTabla.cmps[i].cmps.length; j++) {
                        id++;
                        zCampoState.byId[id] = new ZCampoStateModel(zFormaTabla.cmps[i].cmps[j], id);
                        zCampoState.byId[id].parentId = parentId;
                        zCampoState.allIds.push(id);
                        zFormaTablaCmpsIds.push(id);
                    }
                }
                id++;
            }

            return zFormaTablaCmpsIds;
        }

        const agregarZComandosBtnsFormaState = (getStateFn: () => IZAplState,
            zFormaTabla: IZFormaTabla,
            zComandosFormaState: EntityNormalizedObj<IZComandoFormaState>): Array<number> => {

            let zFormaTablaBtnsIds: Array<number> = [];

            if (!zFormaTabla.btns) {
                return zFormaTablaBtnsIds;
            }

            let id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(getStateFn());
            for (let i = 0; i < zFormaTabla.btns.length; i++) {
                zComandosFormaState.byId[id] = new ZComandoFormaState(zFormaTabla.btns[i], id);
                zComandosFormaState.allIds.push(id);
                zFormaTablaBtnsIds.push(id);
                id++;
            }

            return zFormaTablaBtnsIds;
        }

        const agregarZComandosLinEstFormaState = (getStateFn: () => IZAplState,
            zFormaTabla: IZFormaTabla,
            zComandosFormaState: EntityNormalizedObj<IZComandoFormaState>): Array<number> => {

            let zFormaTablaLinEstIds: Array<number> = [];

            if (!zFormaTabla.linEst) {
                return zFormaTablaLinEstIds;
            }

            let id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(getStateFn());
            id = id + zComandosFormaState.allIds.length + 1;

            for (let i = 0; i < zFormaTabla.linEst.length; i++) {
                zComandosFormaState.byId[id] = new ZComandoFormaState(zFormaTabla.linEst[i], id);
                zComandosFormaState.allIds.push(id);
                zFormaTablaLinEstIds.push(id);
                id++;
            }

            return zFormaTablaLinEstIds;
        }

        const cmPxCrear = (px:number,
            pilaPantexState: EntityNormalizedObj<IZPantexState>,
            zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
            zVentanaState: EntityNormalizedObj<IZVentanaState>,
            zCampoState: EntityNormalizedObj<IZCampoState>,
            zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>
        ): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.CM_PXCREAR,
            px,
            pilaPantexState,
            zFormaTablaState,
            zVentanaState,
            zCampoState,
            zComandoFormaState
        });

        const lanzarPxCrear = (zPantex: IZPantex): ActionTypes.ZPantexModule.Action => ({
            type: ActionTypes.ZPantexModule.CM_PXCREAR,
            zPantex,
        });

        export const pxArrivar = (pxArrivar: CM.IPxArrivar): ActionTypes.ZPantexModule.Action => ({
            type: ActionTypes.ZPantexModule.CM_PXARRIVAR,
            pxArrivar,
        });

        export const setEsPxModal = (esPxModal: boolean): ActionTypes.ZPantexModule.Action => ({
            type: ActionTypes.ZPantexModule.SET_ESPXMODAL,
            esPxModal
        });

        export const pxDestruir = (pxDestruirParams: CM.IPxDestruir): ActionTypes.ZPantexModule.Action => ({
            type: ActionTypes.ZPantexModule.PX_DESTRUIR,
            pxDestruirParams
        });
    }


    export namespace ZPantexStateModule {

        export namespace ZPantexState {

            export const adicionar = (zPantextState: IZPantexState) => (dispatch: any, getStateNotTyped: () => IZAplState): Promise<ResultadoActionConDato<IZPantexState>> =>
                new Promise<ResultadoActionConDato<IZPantexState>>((resolve, reject) => {

                    let actionResultReturn = new ResultadoActionConDato<IZPantexState>();

                    dispatch(store(zPantextState));

                    actionResultReturn.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                    actionResultReturn.retorno = zPantextState;
                    resolve(actionResultReturn);
                });

            const store = (zPantexState: IZPantexState): ActionTypes.ZPantexState.Action => ({
                type: ActionTypes.ZPantexState.STORE,
                zPantexState
            });

            export const remove = (id: number): ActionTypes.ZPantexState.Action => ({
                type: ActionTypes.ZPantexState.REMOVE,
                id
            });

            export const addZft = (id: number, newZftId: number): ActionTypes.ZPantexState.Action => ({
                type: ActionTypes.ZPantexState.ADD_ZFT,
                id,
                newZftId
            });

            export const agregarZfts = (zPantex: IZPantex) => (dispatch: any, getState: () => IZAplState) => {
                if (zPantex.zFormaTablaList) {
                    for (let i = 0; i < zPantex.zFormaTablaList.length; i++) {
                        let zFormaTablaState = new ZFormaTablaStateModel(1);
                        dispatch(ZPantexStateModule.ZFormaTablaState.adicionar(zPantex.zFormaTablaList[i], zFormaTablaState)).then(
                            (actionResult: ResultadoActionConDato<IZFormaTablaState>) => {
                                dispatch(ZPantexStateModule.ZPantexState.addZft(zPantex.numPx, actionResult.retorno.id));
                            }
                        );
                    }
                }
            }
        }

        export namespace ZFormaTablaState {

            export const adicionar = (zFormaTabla: IZFormaTabla, zFormaTablaState: IZFormaTablaState) => (dispatch: any, getStateNotTyped: () => IZAplState): Promise<ResultadoActionConDato<IZFormaTablaState>> =>
                new Promise<ResultadoActionConDato<IZFormaTablaState>>((resolve, reject) => {

                    let actionResultReturn = new ResultadoActionConDato<IZFormaTablaState>();

                    if (!Selectors.ZPantexStateModule.ZFormaTablaState.getZFormaTablaStateMap(getStateNotTyped()).byId[zFormaTablaState.id]) {
                        zFormaTablaState.id = Selectors.ZPantexStateModule.ZFormaTablaState.getNextZFormaTablaStateId(getStateNotTyped());
                    }

                    dispatch(store(zFormaTablaState));
                    dispatch(ZFormaTablaState.agregarZVentana(zFormaTabla, zFormaTablaState));
                    dispatch(ZFormaTablaState.agregarZCampos(zFormaTabla, zFormaTablaState));
                    dispatch(ZFormaTablaState.agregarZComandos(zFormaTabla, zFormaTablaState));

                    actionResultReturn.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                    actionResultReturn.retorno = zFormaTablaState;
                    resolve(actionResultReturn);
                });

            const store = (zFormaTablaState: IZFormaTablaState): ActionTypes.ZFormaTablaState.Action => ({
                type: ActionTypes.ZFormaTablaState.STORE,
                zFormaTablaState
            });

            export const remove = (id: number): ActionTypes.ZFormaTablaState.Action => ({
                type: ActionTypes.ZFormaTablaState.REMOVE,
                id
            });

            export const agregarZVentana = (zFormaTabla: IZFormaTabla, zFormaTablaState: IZFormaTablaState) => (dispatch: any, getState: () => IZAplState) => {

                let zVentanaState = new ZVentanaStateModel(zFormaTabla.ven, 1);
                dispatch(ZPantexStateModule.ZVentanaState.adicionar(zVentanaState)).then(
                    (actionResultZVentana: ResultadoActionConDato<IZVentanaState>) => {
                        dispatch(ZFormaTablaState.setIdZVentana(zFormaTablaState.id, actionResultZVentana.retorno.id));
                    }
                );
            }

            export const agregarZCampos = (zFormaTabla: IZFormaTabla, zFormaTablaState: IZFormaTablaState) => (dispatch: any, getState: () => IZAplState) => {
                if (zFormaTabla.cmps) {
                    for (let i = 0; i < zFormaTabla.cmps.length; i++) {
                        let zCampoState = new ZCampoStateModel(zFormaTabla.cmps[i], 1);
                        dispatch(ZPantexStateModule.ZCampoState.adicionar(zCampoState)).then(
                            (actionResultZCampo: ResultadoActionConDato<IZCampoState>) => {
                                dispatch(ZFormaTablaState.addZCampo(zFormaTablaState.id, actionResultZCampo.retorno.id));
                                if (zFormaTabla.cmps[i].cmps && zFormaTabla.cmps[i].cmps.length > 0) {
                                    for (let j = 0; j < zFormaTabla.cmps[i].cmps.length; j++) {
                                        let zCampoHijoState = new ZCampoStateModel(zFormaTabla.cmps[i].cmps[j], 1);
                                        zCampoHijoState.parentId = actionResultZCampo.retorno.id;
                                        dispatch(ZPantexStateModule.ZCampoState.adicionar(zCampoHijoState)).then(
                                            (actionResultZCampoHijo: ResultadoActionConDato<IZFormaTablaState>) => {
                                                dispatch(ZFormaTablaState.addZCampo(zFormaTablaState.id, actionResultZCampoHijo.retorno.id));
                                            }
                                        );
                                    }
                                }
                            }
                        );
                    }
                }
            }

            export const agregarZComandos = (zFormaTabla: IZFormaTabla, zFormaTablaState: IZFormaTablaState) => (dispatch: any, getState: () => IZAplState) => {

                if (zFormaTabla.cmps) {
                    for (let i = 0; i < zFormaTabla.linEst.length; i++) {
                        let zComandoFormaState = new ZComandoFormaStateModel(zFormaTabla.linEst[i], 1);
                        dispatch(ZPantexStateModule.ZComandoFormaState.adicionar(zComandoFormaState)).then(
                            (actionResultZComandoForma: ResultadoActionConDato<IZComandoFormaState>) => {
                                dispatch(ZFormaTablaState.addComandoLinEst(zFormaTablaState.id, actionResultZComandoForma.retorno.id));
                            }
                        );
                    }

                    for (let i = 0; i < zFormaTabla.btns.length; i++) {
                        let zComandoFormaState = new ZComandoFormaStateModel(zFormaTabla.btns[i], 1);
                        dispatch(ZPantexStateModule.ZComandoFormaState.adicionar(zComandoFormaState)).then(
                            (actionResultZComandoForma: ResultadoActionConDato<IZComandoFormaState>) => {
                                dispatch(ZFormaTablaState.addComandoBtns(zFormaTablaState.id, actionResultZComandoForma.retorno.id));
                            }
                        );
                    }
                }
            }


            export const setIdZVentana = (id: number, zventanaId: number): ActionTypes.ZFormaTablaState.Action => ({
                type: ActionTypes.ZFormaTablaState.SET_IDZVENTANA,
                id,
                zventanaId
            });

            export const addZCampo = (id: number, zcampoId: number): ActionTypes.ZFormaTablaState.Action => ({
                type: ActionTypes.ZFormaTablaState.ADD_ZCAMPO,
                id,
                zcampoId
            });

            export const addComandoLinEst = (id: number, zcomandoId: number): ActionTypes.ZFormaTablaState.Action => ({
                type: ActionTypes.ZFormaTablaState.ADD_COMANDO_LINEST,
                id,
                zcomandoId
            });

            export const addComandoBtns = (id: number, zcomandoId: number): ActionTypes.ZFormaTablaState.Action => ({
                type: ActionTypes.ZFormaTablaState.ADD_COMANDO_BTNS,
                id,
                zcomandoId
            });

        }

        export namespace ZCampoState {

            export const adicionar = (zCampoState: IZCampoState) => (dispatch: any, getStateNotTyped: () => IZAplState): Promise<ResultadoActionConDato<IZCampoState>> =>
                new Promise<ResultadoActionConDato<IZCampoState>>((resolve, reject) => {

                    let actionResultReturn = new ResultadoActionConDato<IZCampoState>();

                    if (!Selectors.ZPantexStateModule.ZCampoState.getZCampoStateMap(getStateNotTyped()).byId[zCampoState.id]) {
                        zCampoState.id = Selectors.ZPantexStateModule.ZCampoState.getNextZCampoStateId(getStateNotTyped());
                    }

                    dispatch(store(zCampoState));

                    actionResultReturn.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                    actionResultReturn.retorno = zCampoState;
                    resolve(actionResultReturn);
                });

            const store = (zCampoState: IZCampoState): ActionTypes.ZCampoState.Action => ({
                type: ActionTypes.ZCampoState.STORE,
                zCampoState
            });

            export const remove = (id: number): ActionTypes.ZCampoState.Action => ({
                type: ActionTypes.ZCampoState.REMOVE,
                id
            });
        }

        export namespace ZComandoFormaState {

            export const adicionar = (zComandoFormaState: IZComandoFormaState) => (dispatch: any, getStateNotTyped: () => IZAplState): Promise<ResultadoActionConDato<IZComandoFormaState>> =>
                new Promise<ResultadoActionConDato<IZComandoFormaState>>((resolve, reject) => {

                    let actionResultReturn = new ResultadoActionConDato<IZComandoFormaState>();

                    if (!Selectors.ZPantexStateModule.ZComandoFormaState.getZComandoFormaStateMap(getStateNotTyped()).byId[zComandoFormaState.id]) {
                        zComandoFormaState.id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(getStateNotTyped());
                    }

                    dispatch(store(zComandoFormaState));

                    actionResultReturn.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                    actionResultReturn.retorno = zComandoFormaState;
                    resolve(actionResultReturn);
                });

            const store = (zComandoFormaState: IZComandoFormaState): ActionTypes.ZComandoFormaState.Action => ({
                type: ActionTypes.ZComandoFormaState.STORE,
                zComandoFormaState
            });

            export const remove = (id: number): ActionTypes.ZComandoFormaState.Action => ({
                type: ActionTypes.ZComandoFormaState.REMOVE,
                id
            });
        }

        export namespace ZVentanaState {

            export const adicionar = (zVentanaState: IZVentanaState) => (dispatch: any, getStateNotTyped: () => IZAplState): Promise<ResultadoActionConDato<IZVentanaState>> =>
                new Promise<ResultadoActionConDato<IZVentanaState>>((resolve, reject) => {

                    let actionResultReturn = new ResultadoActionConDato<IZVentanaState>();

                    if (!Selectors.ZPantexStateModule.ZVentanaState.getZVentanaStateMap(getStateNotTyped()).byId[zVentanaState.id]) {
                        zVentanaState.id = Selectors.ZPantexStateModule.ZVentanaState.getNextZVentanaStateId(getStateNotTyped());
                    }

                    dispatch(store(zVentanaState));

                    actionResultReturn.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                    actionResultReturn.retorno = zVentanaState;
                    resolve(actionResultReturn);
                });

            const store = (zVentanaState: IZVentanaState): ActionTypes.ZVentanaState.Action => ({
                type: ActionTypes.ZVentanaState.STORE,
                zVentanaState
            });

            export const remove = (id: number): ActionTypes.ZVentanaState.Action => ({
                type: ActionTypes.ZVentanaState.REMOVE,
                id
            });
        }
    }

    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel): ActionTypes.Action => ({
        type: ZMenu.ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel: zmenuItemModel
    });

    export const cerrarVentanaRecurso = (zRecursoViewModel: ZRecursoViewModel): ActionTypes.Action => ({
        type: ActionTypes.CERRAR_VENTANA_RECURSO,
        zrecursoViewModel: zRecursoViewModel
    });

    export const abrirVentanaZoom = (zreferenciaViewModel: ZReferenciaViewModel): ActionTypes.Action => ({
        type: ActionTypes.ABRIR_VENTANA_ZOOM,
        zreferenciaViewModel: zreferenciaViewModel
    });
}