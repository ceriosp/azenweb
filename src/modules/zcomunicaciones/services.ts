import {
    ResultadoActionConDato,
    ResultadoAction,
    Constants as ZUtilsConstants
} from "../zutils";

import { IColaEventos, EnviarComandoParams } from "./models";
import { Constants } from "./constants";

export namespace Services {

    export const lanzarAplicacion =
        (idApl: string): Promise<ResultadoActionConDato<IColaEventos>> => {
            return new Promise<ResultadoActionConDato<IColaEventos>>((resolve, reject) => {
                enviarRequestComando<IColaEventos>({
                    cmd: Constants.CodigoComandoEnum.CM_APLICACION,
                    buffer: 'azen',
                    idApl: idApl
                }).then(
                    (resultadoCmAplicacion:ResultadoActionConDato<IColaEventos>)=>{
                        console.log("resultado CM_APLICACION");
                        console.log(resultadoCmAplicacion);                        
                        enviarRequestComando<Object>({
                            cmd:Constants.CodigoComandoEnum.CM_DEFMENU,
                            buffer:'azen',
                            idApl:idApl
                        }).then(
                            (result)=>{
                                console.log('resultado menu');
                                console.log(result);
                            }
                        );
                    },
                    ()=>{}
                );
            });
        }

    const enviarRequestComando = <TRetorno>(parametros: EnviarComandoParams): Promise<ResultadoActionConDato<TRetorno>> => {
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
                    resultadoActionExito.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                    resolve(resultadoActionExito);
                })
                .catch((error) => {
                    let resultadoActionError = new ResultadoAction();
                    resultadoActionError.resultado = ZUtilsConstants.ResultadoAccionEnum.ERROR;
                    resultadoActionError.mensaje = `Error ejecutando comando ${cmd}`;
                    resultadoActionError.traza = error;
                    console.error("Comunicaciones/services/enviarRequestComando");
                    console.error(resultadoActionError);
                    reject(resultadoActionError);
                });
        })
    }

}
