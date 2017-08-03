import {
    ResultadoActionConDato,
    ResultadoAction,
    Constants as ZUtilsConstants
} from "../zutils";

import { IColaEventos } from "./models";

export namespace Services {

    ResultadoActionConDato
    export const lanzarAplicacion =
        (identificadorAplicacion: string): Promise<ResultadoActionConDato<IColaEventos>> =>
            new Promise<ResultadoActionConDato<IColaEventos>>((resolve, reject) => {
                //fetch(`http://52.11.111.216:8080/azen/Sesion?cmd=-1&buffer=azen&idApl=${identificadorAplicacion}`, {
                    fetch(`http://localhost:8585/azenweb/server/despacharRecurso.php`, {
                    /*
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    */
                    method: 'GET',
                })
                    .then(response => response.text())
                    .then((colaEventoStr: string) => {
                        //colaEventoStr = colaEventoStr.substring(0, colaEventoStr.length - 1);
                        //debugger
                        let colaEventos: IColaEventos = JSON.parse(colaEventoStr);
                        let resultadoActionExito = new ResultadoActionConDato<IColaEventos>();
                        resultadoActionExito.retorno = colaEventos;
                        resultadoActionExito.resultado = ZUtilsConstants.ResultadoAccionEnum.EXITO;
                        resolve(resultadoActionExito);
                    })
                    .catch((error) => {
                        let resultadoActionError = new ResultadoAction();
                        resultadoActionError.resultado = ZUtilsConstants.ResultadoAccionEnum.ERROR;
                        resultadoActionError.mensaje = "Error lanzando aplicación";
                        resultadoActionError.traza = error;
                        console.error("Comunicaciones/services/lanzarAplicacion");
                        console.error(resultadoActionError);
                        reject(resultadoActionError);
                    });
            })
}
