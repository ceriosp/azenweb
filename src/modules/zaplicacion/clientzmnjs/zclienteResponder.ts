import * as ZUtils from "../../zutils";
import * as ZCommon from "../../zcommon";
import {
    Actions as AppActions
} from '../../app/actions';
import {
    ResultadoActionConDato
} from "../../zutils";
import {
    Actions as ZPantexActions
} from '../../zpantex/actions';

import {
    Selectors as ZPantexSelectors
} from '../../zpantex/selectors';



import {
    IZEvento,
    IZAplState,
    IZColaEventos,
    ZPantexState
} from "../../zcommon";

import * as ZComunicaciones from "../../zcomunicaciones";

import { Services } from '../../zaplicacion';
import * as zCommon from "../../zcommon";
import { Actions } from "../../zcomunicaciones";

export namespace ZclienteResponder {

    export const responderEventoCliente = (zComando: ZCommon.Constants.ComandoEnum, buffer: string = "") =>
        (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {

            let tipoAJAXIndicador: zCommon.Constants.TipoAJAXIndicadorEnum;

            switch (zComando) {

                case ZCommon.Constants.ComandoEnum.CM_ACEPTAR:
                    if (ZPantexSelectors.ZPantexStateModule.getZParametrosComando(getState()).byId[ZCommon.Constants.ComandoEnum.CM_ACEPTAR]) {
                        buffer = ZPantexSelectors.ZPantexStateModule.getZParametrosComando(getState()).byId[ZCommon.Constants.ComandoEnum.CM_ACEPTAR].buffer;
                    }
                    tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.MODAL;
                    break;

                case ZCommon.Constants.ComandoEnum.CM_IRACMP:
                case ZCommon.Constants.ComandoEnum.CM_CAMBIOCMP:
                case ZCommon.Constants.ComandoEnum.CM_IRALINEA:
                case zCommon.Constants.ComandoEnum.CM_PRIMERO:
                case zCommon.Constants.ComandoEnum.CM_ANTREG:
                case zCommon.Constants.ComandoEnum.CM_SGTEREG:
                case zCommon.Constants.ComandoEnum.CM_ULTIMO:
                case ZCommon.Constants.ComandoEnum.CM_CERRAR:
                case ZCommon.Constants.ComandoEnum.CM_RETOCAR:
                case ZCommon.Constants.ComandoEnum.CM_CAMBIOCMPIND:
                    tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.NO_MODAL;
                    break;

                case ZCommon.Constants.ComandoEnum.CM_SI:
                case ZCommon.Constants.ComandoEnum.CM_NO:
                case ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN:
                case ZCommon.Constants.ComandoEnum.CM_EJECOPCION:
                case ZCommon.Constants.ComandoEnum.CM_DEFMENU:
                case zCommon.Constants.ComandoEnum.CM_DETALLAR:

                default:
                    tipoAJAXIndicador = zCommon.Constants.TipoAJAXIndicadorEnum.MODAL;
                    break;
            }

            return new Promise<ResultadoActionConDato<IZColaEventos>>((resolve, reject) => {
                dispatch(ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
                    cmd: zComando,
                    buffer: buffer,
                    tipoAJAXIndicador: tipoAJAXIndicador
                }))
                    .then((resultadoClienteCm: ResultadoActionConDato<IZColaEventos>) => {
                        if (resultadoClienteCm.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                            return;
                        }
                        dispatch(AppActions.setUltimoComandoEnviado(zComando));
                        dispatch(ZPantexActions.ZPantexStateModule.setComandoBuffer(zComando, ""));
                        Services.Responder.procesarZColaEventos(resultadoClienteCm.retorno, dispatch, getState);
                        resolve(resultadoClienteCm);
                    },
                        () => { }
                    );
            });
        }

}    