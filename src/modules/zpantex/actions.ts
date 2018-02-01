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
    IZColaEventos,

} from "../zcommon";

import * as ZMenu from '../zmenu';

import {
    ActionTypes,
} from './actionTypes';
import { ResultadoAction, ResultadoActionConDato, Constants as ZUtilsConstants } from "../zutils";

import { Actions as ZAplicacionActions } from "../zaplicacion/actions";
import { Selectors } from "./selectors";

export namespace DTO {
    export class DespacharOpcionMenuParamsDTO {
        tipoRecurso: ZCommon.Constants.TipoRecurso;
        idRecurso: string;
        zrecursoViewModelEntityMapOld: EntityMap<ZRecursoViewModel>;
    }
}

export namespace Actions {

    export namespace ZPantexStateModule {

        export const pxCrear = (zPantex: IZPantex) => (dispatch: any, getStateFn: () => IZAplState) => {

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
                    agregarZCamposState(getStateFn, zPantex, zPantex.zFormaTablaList[i], zCampoState);

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
            zPantex: IZPantex,
            zFormaTabla: IZFormaTabla,
            zCampoState: EntityNormalizedObj<IZCampoState>): Array<number> => {

            let zFormaTablaCmpsIds = [];

            let id = Selectors.ZPantexStateModule.ZCampoState.getNextZCampoStateId(getStateFn());
            for (let i = 0; i < zFormaTabla.cmps.length; i++) {
                zCampoState.byId[id] = new ZCampoStateModel(zFormaTabla.cmps[i], id, zPantex.numPx);
                zCampoState.allIds.push(id);
                zFormaTablaCmpsIds.push(id);
                if (zFormaTabla.cmps[i].cmps) {
                    let parentId = id;
                    zCampoState.byId[id].esCampoGrafico = true;                    
                    for (let j = 0; j < zFormaTabla.cmps[i].cmps.length; j++) {
                        id++;
                        zCampoState.byId[id] = new ZCampoStateModel(zFormaTabla.cmps[i].cmps[j], id, zPantex.numPx);
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

        const cmPxCrear = (px: number,
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

        export const ponerModal = (ponerModal: boolean): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.CM_PONERMODAL,
            ponerModal
        });

        export const cmPxArrivar = (pxArrivarParams: CM.IPxArrivar): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.CM_PXARRIVAR,
            pxArrivarParams,
        });

        export const sincCampo = (px: number, hashCampoValor: Map<string, IZCampoState>) => (dispatch: any, getStateFn: () => IZAplState) => {
            dispatch(cmSincCampo(px, hashCampoValor));
        }

        export const cmSincCampo = (px: number, hashDefinicionCampos: Map<string, IZCampoState>): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.CM_SINCCAMPO,
            px,
            hashDefinicionCampos,
        });

        export const onCampoChanged = (zcampoState: IZCampoState, valor: any): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.ON_CAMPOCHANGE,
            zcampoState,
            valor,
        });

        export const onCampoRadioChanged = (zcampoState: IZCampoState, valor: any): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.ON_CAMPORADIOCHANGE,
            zcampoState,
            valor,
        });

        export const onCampoCheckboxChanged = (zcampoState: IZCampoState, valor: boolean): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.ON_CAMPOCHECKBOXCHANGE,
            zcampoState,
            valor,
        });
        
        export const setZCampoHaCambiado = (idZCampoState: number, haCambiado: boolean): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.SET_ZCAMPOSTATE_HACAMBIADO,
            idZCampoState,
            haCambiado,
        });        

        export const onCampoBlur = (zcampoState: IZCampoState) => (dispatch: any, getStateFn: () => IZAplState) => {
            if (zcampoState.haCambiado) {
                const buffer = `<nc>${zcampoState.nomCmp}</nc><vc>${zcampoState.value}</vc>`;
                dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_CAMBIOCMP, buffer)).then(
                    (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                        dispatch(setZCampoHaCambiado(zcampoState.id, false));
                    }
                );
            }
        }

        export const prenderValorBitRadio = (zcampoState: IZCampoState) => (dispatch: any, getStateFn: () => IZAplState) => {
            dispatch(onCampoRadioChanged(zcampoState, zcampoState.lon));
            const buffer = `<nc>${zcampoState.nomCmp}</nc><vc>*</vc><pb>${zcampoState.lon}</pb>`;
            dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_CAMBIOCMP, buffer)).then(
                (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                    
                }
            );        
        }

        export const notificarCambioCheckbox = (zcampoState: IZCampoState) => (dispatch: any, getStateFn: () => IZAplState) => {
            const value:boolean = !zcampoState.checked;
            dispatch(onCampoCheckboxChanged(zcampoState, value));
            let buffer = `<nc>${zcampoState.nomCmp}</nc><vc>${value ? "X" : " "}</vc><pb>${zcampoState.lon}</pb>`;
            dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_CAMBIOCMP, buffer)).then(
                (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                    
                }
            );        
        }
        

        /********************* */
        export const setEsPxModal = (esPxModal: boolean): ActionTypes.ZPantexModule.Action => ({
            type: ActionTypes.ZPantexModule.SET_ESPXMODAL,
            esPxModal
        });

        export const cmPxDestruir = (pxDestruirParams: CM.IPxDestruir): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.CM_PXDESTRUIR,
            pxDestruirParams,
        });

        export const pxDestruir = (pxDestruirParams: CM.IPxDestruir): ActionTypes.ZPantexModule.Action => ({
            type: ActionTypes.ZPantexModule.PX_DESTRUIR,
            pxDestruirParams
        });
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