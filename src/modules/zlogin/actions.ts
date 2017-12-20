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

import { Selectors } from './selectors';

export namespace Actions {

    export namespace ZLoginModule {

        export const login = () => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {
            return new Promise<ResultadoActionConDato<IZColaEventos>>((resolve, reject) => {

                let zLoginModule = Selectors.getZLoginModule(getState());

                dispatch(ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
                    cmd: ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN,
                    buffer: `<cm>LOGIN</cm><usr>${zLoginModule.username}</usr><vc>${zLoginModule.password}</vc>`,
                    tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL
                }))
                    .then((resultadoCmAcceptLogin: ResultadoActionConDato<IZColaEventos>) => {
                        if (resultadoCmAcceptLogin.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                            reject(resultadoCmAcceptLogin);
                            return;
                        }
                        ZAplication.Services.Responder.procesarZColaEventos(resultadoCmAcceptLogin.retorno, dispatch, getState);
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