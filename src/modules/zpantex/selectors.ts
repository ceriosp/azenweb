import { createSelector } from 'reselect';

import {

    //Models
    ZRecursoViewModel,

    //State
    ZAplicationState,

    //Utils
    EntityNormalizedObj,
    IZAplState,
    IZPantexState,
    IZCampoState,
    IZFormaTablaState,
    IZComandoFormaState,
    IZVentanaState,
    IZPantex,
    IEntityNormalizeObj,
    ZFilaCamposState,
    IZFilaCamposState

} from "../zcommon";

export namespace Selectors {

    export const getZPilaPantexMap = (appState: IZAplState): Array<IZPantex> => {
        return appState.zPantexModule.pilaPantex;
    };

    export namespace ZPantexStateModule {

        export const getPilaPx = (appState: IZAplState): Array<number> => {

            if (!appState.zPantexStateModule.pilaPx) {
                return new Array<number>();
            }

            return appState.zPantexStateModule.pilaPx;
        };

        export namespace ZPantexState {

            export const getZPantexStateMap = (appState: IZAplState): EntityNormalizedObj<IZPantexState> => {

                if (!appState.zPantexStateModule.pilaPantexState) {
                    return new EntityNormalizedObj<IZPantexState>();
                }

                return appState.zPantexStateModule.pilaPantexState;
            };
        }

        export namespace ZFormaTablaState {

            export const getZFormaTablaStateMap = (appState: IZAplState): EntityNormalizedObj<IZFormaTablaState> => {

                if (!appState.zPantexStateModule.zFormaTablaState) {
                    return new EntityNormalizedObj<IZFormaTablaState>();
                }

                return appState.zPantexStateModule.zFormaTablaState;
            };

            export const getNextZFormaTablaStateId = createSelector(
                [getZFormaTablaStateMap],
                (getZFormaTablaStateMap: EntityNormalizedObj<IZFormaTablaState>): number => {

                    if (getZFormaTablaStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZFormaTablaStateMap.allIds) + 1;
                }
            );
        }

        export namespace ZCampoState {

            export const getZCampoStateMap = (appState: IZAplState): EntityNormalizedObj<IZCampoState> => {

                if (!appState.zPantexStateModule.zCampoState) {
                    return new EntityNormalizedObj<IZCampoState>();
                }

                return appState.zPantexStateModule.zCampoState;
            };

            export const getNextZCampoStateId = createSelector(
                [getZCampoStateMap],
                (getZCampoStateMap: EntityNormalizedObj<IZCampoState>): number => {

                    if (getZCampoStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZCampoStateMap.allIds) + 1;
                }
            );
        }

        export namespace ZComandoFormaState {

            export const getZComandoFormaStateMap = (appState: IZAplState): EntityNormalizedObj<IZComandoFormaState> => {

                if (!appState.zPantexStateModule.zComandoFormaState) {
                    return new EntityNormalizedObj<IZComandoFormaState>();
                }

                return appState.zPantexStateModule.zComandoFormaState;
            };

            export const getNextZComandoFormaStateId = createSelector(
                [getZComandoFormaStateMap],
                (getZComandoFormaStateMap: EntityNormalizedObj<IZComandoFormaState>): number => {

                    if (getZComandoFormaStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZComandoFormaStateMap.allIds) + 1;
                }
            );
        }

        export namespace ZVentanaState {

            export const getZVentanaStateMap = (appState: IZAplState): EntityNormalizedObj<IZVentanaState> => {

                if (!appState.zPantexStateModule.zVentanaState) {
                    return new EntityNormalizedObj<IZVentanaState>();
                }

                return appState.zPantexStateModule.zVentanaState;
            };

            export const getNextZVentanaStateId = createSelector(
                [getZVentanaStateMap],
                (getZVentanaStateMap: EntityNormalizedObj<IZVentanaState>): number => {

                    if (getZVentanaStateMap.allIds.length == 0) {
                        return 1;
                    }

                    return Math.max.apply(Math, getZVentanaStateMap.allIds) + 1;
                }
            );
        }
    }

    export const getZPilaPantexState = createSelector(
        [
            ZPantexStateModule.getPilaPx,
            ZPantexStateModule.ZPantexState.getZPantexStateMap,
            ZPantexStateModule.ZFormaTablaState.getZFormaTablaStateMap,
            ZPantexStateModule.ZVentanaState.getZVentanaStateMap,
            ZPantexStateModule.ZCampoState.getZCampoStateMap,
            ZPantexStateModule.ZComandoFormaState.getZComandoFormaStateMap,
        ],
        (getPilaPx: Array<number>,
            getZPantexStateMap: EntityNormalizedObj<IZPantexState>,
            getZFormaTablaStateMap: EntityNormalizedObj<IZFormaTablaState>,
            getZVentanaStateMap: EntityNormalizedObj<IZVentanaState>,
            getZCampoStateMap: EntityNormalizedObj<IZCampoState>,
            getZComandoFormaStateMap: EntityNormalizedObj<IZComandoFormaState>): Array<IZPantexState> => {

            let pilaZPantexState = new Array<IZPantexState>();

            /*
            if (getZPantexStateMap.allIds.length != getPilaPx.length) {
                return pilaZPantexState;
            }
            */

            //zpantex
            for (let i = 0; i < getPilaPx.length; i++) {

                let numPx = getPilaPx[i];

                let zPantex = {
                    id: numPx,
                    zFormaTablaListState: []
                } as IZPantexState;

                //zft's
                for (let izft = 0; izft < getZPantexStateMap.byId[numPx].zFormaTablaStateListIds.length; izft++) {
                    let idZft = getZPantexStateMap.byId[numPx].zFormaTablaStateListIds[izft];
                    zPantex.zFormaTablaListState[izft] = { ...getZFormaTablaStateMap.byId[idZft] };

                    zPantex.zFormaTablaListState[izft].zCampoStateListIds = undefined;
                    zPantex.zFormaTablaListState[izft].btnsListIds = undefined;
                    zPantex.zFormaTablaListState[izft].linEstListIds = undefined;

                    //ven
                    zPantex.zFormaTablaListState[izft].venState = getZVentanaStateMap.byId[zPantex.zFormaTablaListState[izft].idZVentana];

                    //zcampos
                    if (getZFormaTablaStateMap.byId[idZft].zCampoStateListIds) {

                        if (zPantex.zFormaTablaListState[izft].venState.numLinsDatos > 0) {
                            zPantex.zFormaTablaListState[izft].filasCamposList = new Array<IZFilaCamposState>(zPantex.zFormaTablaListState[izft].venState.numLinsDatos);
                            zPantex.zFormaTablaListState[izft].cmpsState = undefined;
                        } else {
                            zPantex.zFormaTablaListState[izft].cmpsState = [];
                            zPantex.zFormaTablaListState[izft].filasCamposList = undefined;
                        }

                        let numFilaMulti = -1;
                        for (let i = 0; i < getZFormaTablaStateMap.byId[idZft].zCampoStateListIds.length; i++) {
                            let idZCampo = getZFormaTablaStateMap.byId[idZft].zCampoStateListIds[i];

                            //Es multi
                            if (zPantex.zFormaTablaListState[izft].venState.numLinsDatos > 0) {
                                if (i % zPantex.zFormaTablaListState[izft].numCampos == 0) {
                                    numFilaMulti++;
                                    zPantex.zFormaTablaListState[izft].filasCamposList[numFilaMulti] = new ZFilaCamposState();
                                    zPantex.zFormaTablaListState[izft].filasCamposList[numFilaMulti].cmpsState.push(getZCampoStateMap.byId[idZCampo]);
                                }else{
                                    zPantex.zFormaTablaListState[izft].filasCamposList[numFilaMulti].cmpsState.push(getZCampoStateMap.byId[idZCampo]);
                                }
                                continue;
                            }

                            //es un campo hijo de un gráfico, no va en el array principal, 
                            //sino en el subarray del campo gráfico padre
                            if (getZCampoStateMap.byId[idZCampo].parentId) {
                                continue;
                            }

                            zPantex.zFormaTablaListState[izft].cmpsState.push({ ...getZCampoStateMap.byId[idZCampo] });

                            //zcampos dentro de un campo gráfico
                            let campoActual: IZCampoState = zPantex.zFormaTablaListState[izft].cmpsState[zPantex.zFormaTablaListState[izft].cmpsState.length - 1];
                            if (campoActual.esCampoGrafico) {
                                campoActual.cmpsState = [];
                                for (let k = 0; k < getZCampoStateMap.allIds.length; k++) {
                                    if (getZCampoStateMap.byId[getZCampoStateMap.allIds[k]].parentId == campoActual.id) {
                                        campoActual.cmpsState.push(getZCampoStateMap.byId[getZCampoStateMap.allIds[k]]);
                                    }
                                }
                            }
                        }
                    }

                    //linEst
                    if (getZFormaTablaStateMap.byId[idZft].linEstListIds) {
                        zPantex.zFormaTablaListState[izft].linEstState = [];
                        for (let i = 0; i < getZFormaTablaStateMap.byId[idZft].linEstListIds.length; i++) {
                            let idZComandoForma = getZFormaTablaStateMap.byId[idZft].linEstListIds[i];
                            zPantex.zFormaTablaListState[izft].linEstState[i] = getZComandoFormaStateMap.byId[idZComandoForma];
                        }
                    }

                    //btns
                    if (getZFormaTablaStateMap.byId[idZft].btnsListIds) {
                        zPantex.zFormaTablaListState[izft].btnsState = [];
                        for (let i = 0; i < getZFormaTablaStateMap.byId[idZft].btnsListIds.length; i++) {
                            let idZComandoForma = getZFormaTablaStateMap.byId[idZft].btnsListIds[i];
                            zPantex.zFormaTablaListState[izft].btnsState[i] = getZComandoFormaStateMap.byId[idZComandoForma];
                        }
                    }
                }
                
                pilaZPantexState.push(zPantex);
            }

            return pilaZPantexState;
        }
    );







    export const getRecursosViewModel = (zaplicationState: ZAplicationState): EntityNormalizedObj<ZRecursoViewModel> => zaplicationState.recursosViewModel;

    export const getRecursosActivosViewModelList = createSelector(
        [getRecursosViewModel],
        (recursosViewModelById: EntityNormalizedObj<ZRecursoViewModel>): Array<ZRecursoViewModel> => {

            console.log("recalculates selector");

            let recursosActivos = new Array<ZRecursoViewModel>();

            if (!recursosViewModelById) {
                return recursosActivos;
            }

            if (!recursosViewModelById.allIds) {
                return recursosActivos;
            }

            return recursosActivos;
        }
    );
}