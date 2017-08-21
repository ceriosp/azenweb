import { IZAplList, IZAplState, IZEnviarComandoParams } from "../zcommon/contracts";

import {
    Constants as UtilsConstants,
    ResultadoAction
} from "../zutils";

import {
    ActionTypes,
} from './actionTypes';

import * as ZComunicaciones from '../zcomunicaciones';

export namespace Actions {

    export const login = (parametros: IZEnviarComandoParams) => (dispatch: (p: any) => any, getState: () => IZAplState) => {
        dispatch(ZComunicaciones.Actions.enviarRequestComando(parametros))
            .then((response: any) => {
                dispatch(ZLoginModule.setResultadoAction({ resultado: UtilsConstants.ResultadoAccionEnum.EXITO } as ResultadoAction));
            })
            .catch((error: any) => {
                dispatch(ZLoginModule.setResultadoAction({ resultado: UtilsConstants.ResultadoAccionEnum.ERROR } as ResultadoAction));
            })
    }

    export namespace ZLoginModule {

        export const setUsername = (username: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_USERNAME,
            username
        });

        export const setPassword = (password: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_PASSWORD,
            password
        });

        export const setAplList = (aplList: IZAplList): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_APLLIST,
            aplList
        });

        export const setResultadoAction = (resultadoAction: ResultadoAction): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_RESULTADOACTION,
            resultadoAction
        });
    }
}