import * as ZUtils from '../zutils';
import {
    ResultadoActionConDato, ResultadoAction
} from "../zutils";

import { IZAplState, IZColaEventos, IZEnviarComandoParams } from "../zcommon/contracts";
import { ActionTypes } from "./actionTypes";

import { Selectors as AppSelectors } from "../app/selectors";
import { Constants } from '../zcommon/constants';

export namespace Actions {

    export const enviarRequestComando = <TRetorno>(parametros: IZEnviarComandoParams) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<TRetorno>> => {
        return new Promise<ResultadoActionConDato<TRetorno>>((resolve, reject) => {

            let idApl = AppSelectors.getIdApl(getState());

            let { cmd, buffer } = parametros;
            let requestUrl = `http://52.11.111.216:8080/azen/Sesion?cmd=${cmd}&buffer=${buffer}&idApl=${idApl}`;

            dispatch(setEstaProcesandoRequestServidor(true));
            fetch(requestUrl, {
                //fetch(`http://localhost:8585/azenweb/server/despacharRecurso.php`, {
                /*
                headers: {
                    'Content-Type': 'application/json'
                },
                */
                credentials: 'include',
                method: 'GET',
            })
                .then((response) => {
                    dispatch(setEstaProcesandoRequestServidor(false));
                    return response.text();
                })
                .then((retornoStr: string) => {
                    console.log(retornoStr);
                    if (retornoStr[retornoStr.length - 1] != '}') {
                        retornoStr = retornoStr.substring(0, retornoStr.length - 1);
                    }
                    //console.log(retornoStr);
                    retornoStr = retornoStr.replace('<usr>null</usr>', '');
                    let retorno: TRetorno = JSON.parse(retornoStr);
                    let resultadoActionExito = new ResultadoActionConDato<TRetorno>();
                    resultadoActionExito.retorno = retorno;
                    resultadoActionExito.resultado = ZUtils.Constants.ResultadoAccionEnum.EXITO;
                    resolve(resultadoActionExito);
                })
                .catch((error) => {
                    let resultadoActionError = new ResultadoAction();
                    resultadoActionError.resultado = ZUtils.Constants.ResultadoAccionEnum.ERROR;
                    resultadoActionError.mensaje = `Error ejecutando comando ${cmd}`;
                    resultadoActionError.traza = error;
                    console.error("Comunicaciones/services/enviarRequestComando");
                    console.error(resultadoActionError);
                    dispatch(setEstaProcesandoRequestServidor(false));
                    reject(resultadoActionError);
                });
        });
    }

    export const setEstaProcesandoRequestServidor = (valor: boolean): ActionTypes.Action => ({
        type: ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR,
        valor
    });

}