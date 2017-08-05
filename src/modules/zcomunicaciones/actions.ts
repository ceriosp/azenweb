import * as ZUtils from '../zutils';
import {
    ResultadoActionConDato, ResultadoAction
} from "../zutils";

import { IZAplState, IZColaEventos, IZEnviarComandoParams } from "../zcommon/contracts";

export namespace Actions {

    export const enviarRequestComando = <TRetorno>(parametros: IZEnviarComandoParams) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<TRetorno>> => {
        return new Promise<ResultadoActionConDato<TRetorno>>((resolve, reject) => {
            let { cmd, buffer, idApl } = parametros;
            fetch(`http://52.11.111.216:8080/azen/Sesion?cmd=${cmd}&buffer=${buffer}&idApl=${idApl}`, {
                //fetch(`http://localhost:8585/azenweb/server/despacharRecurso.php`, {
                /*
                headers: {
                    'Content-Type': 'application/json'
                },
                */                
                credentials: 'include',
                method: 'GET',
            })
                .then(                    
                    (response) => {                        
                        return response.text();
                    }
                )
                .then((retornoStr: string) => {                
                    if (retornoStr[retornoStr.length - 1] != '}') {
                        retornoStr = retornoStr.substring(0, retornoStr.length - 1);
                    }
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
                    reject(resultadoActionError);
                });
        });
    }
}