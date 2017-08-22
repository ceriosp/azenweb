import { IZAplList, IZAplState, IZEnviarComandoParams, IZColaEventos } from "../zcommon/contracts";

import {
    ResultadoActionConDato
} from "../zutils/models";

import {
    ActionTypes,
} from './actionTypes';

import * as ZUtils from '../zutils';
import * as ZCommon from '../zcommon';
import * as ZAplication from '../zaplicacion';
import * as ZComunicaciones from '../zcomunicaciones';

export namespace Actions {

    export namespace ZLoginModule {

        export const login = () => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {
            return new Promise<ResultadoActionConDato<IZColaEventos>>((resolve, reject) => {

                dispatch(ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
                    cmd: ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN,
                    buffer: "",
                    idApl: ""
                }))
                    .then((resultadoCmEjecOption: ResultadoActionConDato<IZColaEventos>) => {
                        if (resultadoCmEjecOption.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                            reject(resultadoCmEjecOption);
                            return;
                        }
                        ZAplication.Services.Responder.procesarZColaEventos(resultadoCmEjecOption.retorno, dispatch, getState);
                    });
            });
        }

        export const setUsername = (username: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_USERNAME,
            username
        });

        export const setPassword = (password: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_PASSWORD,
            password
        });

        export const setZAplList = (zAplList: IZAplList): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_ZAPLLIST,
            zAplList
        });
    }
}