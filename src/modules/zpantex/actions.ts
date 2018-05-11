import * as ZCommon from "../zcommon";
import {

    //Models
    ZMenuItemModel,

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
        zrecursoViewModelEntityMapOld: EntityMap<any>;
    }
}

export namespace Actions {

    export namespace ZPantexStateModule {

        export const pxCrear = (zPantex: IZPantex, cmd: Constants.ComandoEnum) => (dispatch: any, getStateFn: () => IZAplState) => {

            let zFormaTablaState: EntityNormalizedObj<ZFormaTablaState> = new EntityNormalizedObj();
            let zVentanaState: EntityNormalizedObj<IZVentanaState> = new EntityNormalizedObj();
            let zCampoState: EntityNormalizedObj<IZCampoState> = new EntityNormalizedObj();
            let zComandoFormaState: EntityNormalizedObj<IZComandoFormaState> = new EntityNormalizedObj();

            agregarZFormaTablasState(getStateFn, zPantex, zFormaTablaState, zVentanaState, zCampoState, zComandoFormaState);

            let pilaPantexState = {
                byId: {
                    [zPantex.numPx]: {
                        id: zPantex.numPx,
                        tipoCmdPantex: cmd,
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
                zFormaTablaState.byId[id] = new ZFormaTablaStateModel(id, zPantex.numPx, zPantex.zFormaTablaList[i].cmps.length);

                zFormaTablaState.byId[id].idZVentana =
                    agregarZVentanaState(getStateFn, zPantex, zPantex.zFormaTablaList[i], id, zVentanaState);

                let camposFijosList: Array<ZCampoStateModel> = [];
                zFormaTablaState.byId[id].zCampoStateListIds =
                    agregarZCamposState(getStateFn, zPantex, zPantex.zFormaTablaList[i], camposFijosList, i, zCampoState);
                zFormaTablaState.byId[id].camposFijosList = camposFijosList;

                zFormaTablaState.byId[id].btnsListIds =
                    agregarZComandosBtnsFormaState(getStateFn, zPantex, zPantex.zFormaTablaList[i], zComandoFormaState);

                zFormaTablaState.byId[id].linEstListIds =
                    agregarZComandosLinEstFormaState(getStateFn, zPantex, zPantex.zFormaTablaList[i], zComandoFormaState);

                zFormaTablaState.allIds.push(id);

                id++;
            }
        }

        const agregarZVentanaState = (getStateFn: () => IZAplState,
            zPantex: IZPantex,
            zFormaTabla: IZFormaTabla,
            zftId: number,
            zVentanaState: EntityNormalizedObj<IZVentanaState>): number => {

            let zFormaTablaVenId: number = undefined;

            if (!zFormaTabla.ven) {
                return zFormaTablaVenId;
            }

            zFormaTablaVenId = zftId;
            zVentanaState.byId[zFormaTablaVenId] = new ZVentanaStateModel(zFormaTabla.ven, zFormaTablaVenId);
            zVentanaState.allIds.push(zFormaTablaVenId);

            return zFormaTablaVenId;
        }

        const agregarZCamposState = (getStateFn: () => IZAplState,
            zPantex: IZPantex,
            zFormaTabla: IZFormaTabla,
            camposFijosList: Array<ZCampoStateModel>,
            indiceZft: number, //indice_zft + 1
            zCampoState: EntityNormalizedObj<IZCampoState>): Array<number> => {

            let zFormaTablaCmpsIds = [];

            let id = Selectors.ZPantexStateModule.ZCampoState.getNextZCampoStateId(getStateFn());

            //No el primer zft
            if (indiceZft != 0) {
                for (let i = 0; i < indiceZft; i++) {
                    id = id + zPantex.zFormaTablaList[i].cmps.length + 1;
                }
            }

            const region = indiceZft + 1;

            //Es multi
            if (zFormaTabla.ven.numLinsDatos > 0) {
                for (let fila = 0; fila <= zFormaTabla.ven.numLinsDatos; fila++) {
                    for (let i = 0; i < zFormaTabla.cmps.length; i++) {
                        const zcampoModel = new ZCampoStateModel(zFormaTabla.cmps[i], id, zPantex.numPx, region, fila + 1);

                        //Campos fijos, ingresarlos sólo una vez en una nueva fila al final
                        if (fila == zFormaTabla.ven.numLinsDatos && zcampoModel.esFijo) {
                            zcampoModel.fi = -1;
                            zCampoState.byId[id] = zcampoModel;
                            zCampoState.allIds.push(id);
                            zFormaTablaCmpsIds.push(id);
                            id++;
                            camposFijosList.push(zcampoModel);
                            continue;
                        }

                        if (zcampoModel.esFijo) {
                            continue;
                        }

                        zCampoState.byId[id] = zcampoModel;
                        zCampoState.allIds.push(id);
                        zFormaTablaCmpsIds.push(id);
                        id++;
                    }
                }
            }
            else { //No es multi
                for (let i = 0; i < zFormaTabla.cmps.length; i++) {
                    zCampoState.byId[id] = new ZCampoStateModel(zFormaTabla.cmps[i], id, zPantex.numPx, region, 0);
                    zCampoState.allIds.push(id);
                    zFormaTablaCmpsIds.push(id);
                    if (zFormaTabla.cmps[i].cmps) {
                        let parentId = id;
                        zCampoState.byId[id].esCampoGrafico = true;
                        for (let j = 0; j < zFormaTabla.cmps[i].cmps.length; j++) {
                            id++;
                            zCampoState.byId[id] = new ZCampoStateModel(zFormaTabla.cmps[i].cmps[j], id, zPantex.numPx, region, 0);
                            zCampoState.byId[id].parentId = parentId;
                            zCampoState.allIds.push(id);
                            zFormaTablaCmpsIds.push(id);
                        }
                    }
                    id++;
                }
            }

            return zFormaTablaCmpsIds;
        }

        const agregarZComandosBtnsFormaState = (getStateFn: () => IZAplState,
            zPantex: IZPantex,
            zFormaTabla: IZFormaTabla,
            zComandosFormaState: EntityNormalizedObj<IZComandoFormaState>): Array<number> => {

            let zFormaTablaBtnsIds: Array<number> = [];

            if (!zFormaTabla.btns) {
                return zFormaTablaBtnsIds;
            }

            let id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(getStateFn());
            for (let i = 0; i < zFormaTabla.btns.length; i++) {
                zComandosFormaState.byId[id] = new ZComandoFormaState(zFormaTabla.btns[i], id, zPantex.numPx);
                zComandosFormaState.allIds.push(id);
                zFormaTablaBtnsIds.push(id);
                id++;
            }

            return zFormaTablaBtnsIds;
        }

        const agregarZComandosLinEstFormaState = (getStateFn: () => IZAplState,
            zPantex: IZPantex,
            zFormaTabla: IZFormaTabla,
            zComandosFormaState: EntityNormalizedObj<IZComandoFormaState>): Array<number> => {

            let zFormaTablaLinEstIds: Array<number> = [];

            if (!zFormaTabla.linEst) {
                return zFormaTablaLinEstIds;
            }

            let id = Selectors.ZPantexStateModule.ZComandoFormaState.getNextZComandoFormaStateId(getStateFn());
            id = id + zComandosFormaState.allIds.length + 1;

            for (let i = 0; i < zFormaTabla.linEst.length; i++) {
                zComandosFormaState.byId[id] = new ZComandoFormaState(zFormaTabla.linEst[i], id, zPantex.numPx);
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

        export const cmSincPx = (listaPxCampos: Array<number>,
            hashZCampos: Map<string, IZCampoState>,
            listaPxComandos: Array<number>,
            hashZComandos: Map<Constants.ComandoEnum, IZComandoFormaState>,
            cambiarTituloVentana: CM.ICambiarTituloVentana,            
            numFilasVisiblesMulti:number,
            numFilasVisiblesMultiPx: number,
            numFilasVisiblesMultiZft:number,
            ultimoComandoEnviado: Constants.ComandoEnum
        ): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.CM_SINCPX,
            listaPxCampos,
            hashZCampos,
            listaPxComandos,
            hashZComandos,
            cambiarTituloVentana,
            numFilasVisiblesMulti,
            numFilasVisiblesMultiPx,
            numFilasVisiblesMultiZft,
            ultimoComandoEnviado
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

        export const onFilaMultiSeleccionada = (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) => (dispatch: any, getStateFn: () => IZAplState) => {
            dispatch(setFilaMultiSeleccionada(zFormaTablaState, indexFilaMultiSeleccionada));
            const buffer = `<fi>${indexFilaMultiSeleccionada}</fi>`;
            dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_IRALINEA, buffer)).then(
                (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                    dispatch(setComandoBuffer(Constants.ComandoEnum.CM_ACEPTAR, buffer));
                }
            );
        }

        export const setFilaMultiSeleccionada = (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.SET_FILAMULTISELECCIONADA,
            zFormaTablaState,
            indexFilaMultiSeleccionada,
        });

        export const setComandoBuffer = (cm: Constants.ComandoEnum, buffer: string): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.SET_COMANDOBUFFER,
            cm,
            buffer,
        });

        export const setTituloVentana = (parametros: CM.IModificar | CM.IAdicionar | CM.IConsultar): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.SET_TITULOVENTANA,
            parametros
        });

        export const onCampoFocusIrACmp = (zcampoState: IZCampoState) => (dispatch: any, getStateFn: () => IZAplState) => {
            const buffer = `<nc>${zcampoState.nomCmp}</nc>`;
            dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_IRACMP, buffer)).then(
                (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                    dispatch(setZCampoHaCambiado(zcampoState.id, false));
                }
            );
        }

        export const onCampoChangedEnviarCmd = (zcampoState: IZCampoState, valor: any) => (dispatch: any, getStateFn: () => IZAplState) => {
            dispatch(onCampoChanged(zcampoState, valor));
            dispatch(onCampoBlur(Selectors.ZPantexStateModule.ZCampoState.getZCampoStateMap(getStateFn()).byId[zcampoState.id]));
        }

        export const onCampoBlur = (zcampoState: IZCampoState) => (dispatch: any, getStateFn: () => IZAplState) => {
            if (zcampoState.haCambiado) {

                let valor = zcampoState.value;

                if(zcampoState.tipo == 36) //Campo moneda, quitar formato
                {
                    valor = valor.replace(/,/g, "");
                }

                dispatch(setZCampoHaCambiado(zcampoState.id, false));
                const buffer = `<nc>${zcampoState.nomCmp}</nc><vc>${valor}</vc>`;
                dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_CAMBIOCMP, buffer)).then(
                    (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                        
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
            const value: boolean = !zcampoState.checked;
            dispatch(onCampoCheckboxChanged(zcampoState, value));
            let buffer = `<nc>${zcampoState.nomCmp}</nc><vc>${value ? "X" : " "}</vc><pb>${zcampoState.lon}</pb>`;
            dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_CAMBIOCMP, buffer)).then(
                (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {

                }
            );
        }

        export const onSaltarMov = (zFormaTablaState: IZFormaTablaState, regionDestino:number) => (dispatch: any, getStateFn: () => IZAplState) => {
            const buffer = `<rg>${regionDestino}</rg>`;
            dispatch(ZAplicacionActions.despacharEventoCliente(Constants.ComandoEnum.CM_SALTAR, buffer)).then(
                (resultadoDesparcharEvento: ResultadoActionConDato<IZColaEventos>) => {
                    dispatch(setZFormaTablaComoRegionActiva(zFormaTablaState.id, zFormaTablaState.numPx));
                }
            );
        }
        
        export const setZFormaTablaComoRegionActiva = (zftId: number, numPx:number): ActionTypes.ZPantexStateModule.Action => ({
            type: ActionTypes.ZPantexStateModule.SET_ZFORMATABLA_COMOREGIONACTIVA,
            zftId,
            numPx
        });
        


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
}