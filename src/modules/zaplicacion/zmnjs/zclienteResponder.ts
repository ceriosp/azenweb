import * as ZUtils from "../../zutils";
import * as ZCommon from "../../zcommon";
import {
    ResultadoActionConDato
} from "../../zutils";

import {
    IZEvento,
    IZAplState,
    IZColaEventos
} from "../../zcommon";

import * as zComunicaciones from "../../zcomunicaciones";

import { Services } from '../../zaplicacion';

export namespace ZclienteResponder {
    export const responderEventoCliente = (zComando: ZCommon.Constants.ComandoEnum) => (dispatch: (p: any) => any, getState: () => IZAplState) => {
        dispatch(zComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
            cmd: zComando,
            buffer: ''
        }))
            .then((resultadoClienteCm: ResultadoActionConDato<IZColaEventos>) => {
                if (resultadoClienteCm.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                    return;
                }
                Services.Responder.procesarZColaEventos(resultadoClienteCm.retorno, dispatch, getState);
            });
    }
}    