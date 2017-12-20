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
import * as zCommon from "../../zcommon";

export namespace ZclienteResponder {
    export const responderEventoCliente = (zComando: ZCommon.Constants.ComandoEnum) => (dispatch: (p: any) => any, getState: () => IZAplState) => {

        let tipoAJAXIndicador: zCommon.Constants.TipoAJAXIndicadorEnum;

        switch (zComando) {
            case zCommon.Constants.ComandoEnum.CM_PRIMERO:
            case zCommon.Constants.ComandoEnum.CM_ANTREG:
            case zCommon.Constants.ComandoEnum.CM_SGTEREG:
            case zCommon.Constants.ComandoEnum.CM_ULTIMO:
            case ZCommon.Constants.ComandoEnum.CM_CERRAR:
            case ZCommon.Constants.ComandoEnum.CM_RETOCAR:
                tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.NO_MODAL;
                break;
            default:
                tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.MODAL;
                break;
        }

        dispatch(zComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
            cmd: zComando,
            buffer: '',
            tipoAJAXIndicador: tipoAJAXIndicador
        }))
            .then((resultadoClienteCm: ResultadoActionConDato<IZColaEventos>) => {
                if (resultadoClienteCm.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                    return;
                }
                Services.Responder.procesarZColaEventos(resultadoClienteCm.retorno, dispatch, getState);
            });
    }
}    