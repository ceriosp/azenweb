import * as ZUtils from '../zutils';
import { ResultadoActionConDato } from "../zutils/models";

import * as ZCommon from '../zcommon';
import { IZAplState, IZColaEventos, IZMenu } from "../zcommon/contracts";

import * as App from '../app';
import * as ZMenu from '../zmenu';
import { Actions as ZMenuActions } from "../zmenu";
import * as ZComunicaciones from '../zcomunicaciones';

import { ActionTypes } from './actionTypes';
import { Services } from "./services";

import { ZclienteResponder } from "./clientzmnjs/zclienteResponder";

export namespace Actions {

    export const lanzarAplicacion = (idApl: string, nomApl: string, lanzarMenu: string) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {

        dispatch(App.Actions.setIdApl(idApl));
        dispatch(App.Actions.setNomApl(nomApl));

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
                        dispatch(ZMenuActions.lanzarMenu());
                    }
                },
                () => { }
                );
        });
    }

    export const lanzarOpcion = (ctx: string) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {
        return new Promise<ResultadoActionConDato<IZColaEventos>>((resolve, reject) => {
            dispatch(ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
                cmd: ZCommon.Constants.ComandoEnum.CM_EJECOPCION,
                buffer: ctx,
                tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL
            })).then(
                (resultadoCmEjecOption: ResultadoActionConDato<IZColaEventos>) => {
                    if (resultadoCmEjecOption.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                        reject(resultadoCmEjecOption);
                        return;
                    }
                    Services.Responder.procesarZColaEventos(resultadoCmEjecOption.retorno, dispatch, getState);
                }
                )
        });
    }

    export const despacharEventoCliente = (cmd: ZCommon.Constants.ComandoEnum) => (dispatch: (p: any) => any, getState: () => IZAplState) => {
        dispatch(ZclienteResponder.responderEventoCliente(cmd));
    }

    export namespace ZAplState {

    }

}