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

    export const responderEventoCliente = (zComando: ZCommon.Constants.ComandoEnum, buffer: string = "") => (dispatch: (p: any) => any, getState: () => IZAplState) => {

        let tipoAJAXIndicador: zCommon.Constants.TipoAJAXIndicadorEnum;

        switch (zComando) {
            case ZCommon.Constants.ComandoEnum.CM_SI:
            case ZCommon.Constants.ComandoEnum.CM_NO:
            case zCommon.Constants.ComandoEnum.CM_PRIMERO:
            case zCommon.Constants.ComandoEnum.CM_ANTREG:
            case zCommon.Constants.ComandoEnum.CM_SGTEREG:
            case zCommon.Constants.ComandoEnum.CM_ULTIMO:
            case ZCommon.Constants.ComandoEnum.CM_CERRAR:
            case ZCommon.Constants.ComandoEnum.CM_RETOCAR:
            case ZCommon.Constants.ComandoEnum.CM_CAMBIOCMP:
            case ZCommon.Constants.ComandoEnum.CM_CAMBIOCMPIND:
                tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.NO_MODAL;
                break;

            case ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN:
            case ZCommon.Constants.ComandoEnum.CM_EJECOPCION:
            case ZCommon.Constants.ComandoEnum.CM_DEFMENU:
            default:
                tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.MODAL;
                break;
        }

        dispatch(zComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
            cmd: zComando,
            buffer: buffer,
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