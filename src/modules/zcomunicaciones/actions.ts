import * as ZCommon from '../zcommon';
import * as ZUtils from '../zutils';
import {
    ResultadoActionConDato, ResultadoAction
} from "../zutils";

import { IZAplState, IZColaEventos, IZEnviarComandoParams } from "../zcommon/contracts";
import { ActionTypes } from "./actionTypes";

export namespace Actions {

    export const enviarRequestComando = <TRetorno>(parametros: IZEnviarComandoParams) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<TRetorno>> => {
        return new Promise<ResultadoActionConDato<TRetorno>>((resolve, reject) => {

            let idApl = getState().idApl;
            let azenURL = getState().azenURL;

            let { cmd, buffer } = parametros;
            let dominioComponentes = window.location.href.split("/");
            let dominio = dominioComponentes[0] + "//" + dominioComponentes[2];
            let requestUrl = azenURL + `/azen/Sesion?cmd=${cmd}&buffer=${buffer}&idApl=${idApl}&dominio=${dominio}`;

            console.log("----------------------------------------------------------------");
            console.time(`${ZCommon.Constants.ComandoEnum[cmd]}`);
            console.log("request: " + requestUrl);

            dispatch(setProcesosServidor(true, parametros.tipoAJAXIndicador))
            fetch(requestUrl, {
                //fetch(azenURL + `/azenweb/server/despacharRecurso.php`, {
                /*
                headers: {
                    'Content-Type': 'application/json'
                },
                */
                credentials: 'include',
                method: 'GET',
            })
                .then((response) => {
                    dispatch(setProcesosServidor(false, parametros.tipoAJAXIndicador))                    
                    return response.text();
                })
                .then((retornoStr: string) => {
                    console.timeEnd(`${ZCommon.Constants.ComandoEnum[cmd]} = ${cmd}`);
                    console.log(retornoStr);
                    if (retornoStr[retornoStr.length - 1] != '}') {
                        retornoStr = retornoStr.substring(0, retornoStr.length - 1);
                    }
                    retornoStr = retornoStr.replace('<usr>null</usr>', '');
                    retornoStr = retornoStr.replace('La edicion de "Cuentas" presenta modificaciones.', 'La edicion de Cuentas presenta modificaciones.');
                    retornoStr = retornoStr.replace('La edicion de "Tercero" presenta modificaciones.', 'La edicion de Tercero presenta modificaciones.');

                    let retorno: TRetorno = JSON.parse(retornoStr);
                    let resultadoActionExito = new ResultadoActionConDato<TRetorno>();
                    resultadoActionExito.retorno = retorno;
                    resultadoActionExito.resultado = ZUtils.Constants.ResultadoAccionEnum.EXITO;
                    resolve(resultadoActionExito);
                })
                .catch((error) => {
                    let resultadoActionError = new ResultadoAction();
                    resultadoActionError.resultado = ZUtils.Constants.ResultadoAccionEnum.ERROR;
                    resultadoActionError.mensaje = `Error ejecutando comando ${ZCommon.Constants.ComandoEnum[cmd]} = ${cmd}`;
                    resultadoActionError.traza = error;
                    console.error("Comunicaciones/services/enviarRequestComando");
                    console.error(resultadoActionError);
                    dispatch(setProcesosServidor(false, parametros.tipoAJAXIndicador))
                    reject(resultadoActionError);
                });
        });
    }

    export const setProcesosServidor = (estaProcesandoRequestServidor: boolean, tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum) => (dispatch: (p: any) => any, getState: () => IZAplState) => {
        dispatch(setEstaProcesandoRequestServidor(estaProcesandoRequestServidor));
        dispatch(setTipoAJAXIndicador(tipoAJAXIndicador));
    }


    export const setEstaProcesandoRequestServidor = (valor: boolean): ActionTypes.Action => ({
        type: ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR,
        valor
    });

    export const setTipoAJAXIndicador = (tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum = ZCommon.Constants.TipoAJAXIndicadorEnum.NIGUNO): ActionTypes.Action => ({
        type: ActionTypes.SET_TIPOAJAXINDICADOR,
        tipoAJAXIndicador
    });

}