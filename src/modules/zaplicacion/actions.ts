import * as ZUtils from '../zutils';
import { ResultadoActionConDato } from "../zutils/models";

import * as ZCommon from '../zcommon';
import { IZAplState, IZColaEventos, IZMenu } from "../zcommon/contracts";

import * as App from '../app';
import * as ZMenu from '../zmenu';
import * as ZComunicaciones from '../zcomunicaciones';
import * as ZLogin from "../zlogin";

import { ActionTypes } from './actionTypes';
import { Services } from "./services";

import { ZclienteResponder } from "./clientzmnjs/zclienteResponder";

export namespace Actions {

    export const lanzarAplicacion = (idApl: string, nomApl: string, username: string = "", lanzarMenu: string) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {

        dispatch(App.Actions.setIdApl(idApl));
        dispatch(App.Actions.setNomApl(nomApl));
        dispatch(ZLogin.Actions.ZLoginModule.setUsername(username));

        return new Promise<ResultadoActionConDato<IZColaEventos>>((resolve, reject) => {
            dispatch(ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
                cmd: ZCommon.Constants.ComandoEnum.CM_APLICACION,
                buffer: 'azen',
                tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL
            }))
                .then(
                (resultadoCmAplicacion: ResultadoActionConDato<IZColaEventos>) => {
                    if (resultadoCmAplicacion.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                        reject(resultadoCmAplicacion);
                        return;
                    }

                    if (lanzarMenu == '1') {
                        dispatch(ZMenu.Actions.lanzarMenu());
                    }
                },
                () => { }
                );
        });
    }

    export const lanzarOpcion = (ctx: string) => (dispatch: (p: any) => any, getState: () => IZAplState) => {
        dispatch(ZclienteResponder.responderEventoCliente(ZCommon.Constants.ComandoEnum.CM_EJECOPCION, ctx));
    }

    export const despacharEventoCliente = (cmd: ZCommon.Constants.ComandoEnum, buffer: string = "") => (dispatch: (p: any) => any, getState: () => IZAplState) : Promise<ResultadoActionConDato<IZColaEventos>> => {
        return dispatch(ZclienteResponder.responderEventoCliente(cmd, buffer));
    }

    export namespace ZAplState {

    }

}