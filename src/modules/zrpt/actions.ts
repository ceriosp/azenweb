import { IZAplList, IZAplState, IZEnviarComandoParams, IZColaEventos } from "../zcommon/contracts";

import {
    ActionTypes,
} from './actionTypes';


export namespace Actions {

    export namespace ZrptModule {

        export const cerrarVisorReporte = () => (dispatch: (p: any) => any, getState: () => IZAplState) => {
            dispatch(setMostrarReporte(false));
            dispatch(setRutaReporte(''));
        }

        export const setMostrarReporte = (mostrarReporte: boolean): ActionTypes.ZrptModule.Action => ({
            type: ActionTypes.ZrptModule.SET_MOSTRARREPORTE,
            mostrarReporte
        });

        export const setRutaReporte = (rutaReporte: string): ActionTypes.ZrptModule.Action => ({
            type: ActionTypes.ZrptModule.SET_RUTAREPORTE,
            rutaReporte
        });
    }
}