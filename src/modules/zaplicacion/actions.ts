import * as ZUtils from '../zutils';
import {
    ResultadoActionConDato
} from "../zutils/models";

import * as ZCommon from '../zcommon';
import {
    IZAplState, IZColaEventos
} from "../zcommon/contracts";

import * as ZMenu from '../zmenu';

import * as ZComunicaciones from '../zcomunicaciones';
import { IZMenu } from "../zcommon/contracts";

export namespace Actions {

    export const lanzarAplicacion = (idApl: string) => (dispatch: (p: any) => any, getState: () => IZAplState): Promise<ResultadoActionConDato<IZColaEventos>> => {
        return new Promise<ResultadoActionConDato<IZColaEventos>>((resolve, reject) => {
            dispatch(ZComunicaciones.Actions.enviarRequestComando<IZColaEventos>({
                cmd: ZCommon.Constants.CodigoComandoEnum.CM_APLICACION,
                buffer: 'azen',
                idApl: idApl
            }))
                .then(
                (resultadoCmAplicacion: ResultadoActionConDato<IZColaEventos>) => {
                    console.log("resultado CM_APLICACION");
                    console.log(resultadoCmAplicacion);
                    if (resultadoCmAplicacion.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR) {
                        reject(resultadoCmAplicacion);
                        return;
                    }
                    dispatch(ZComunicaciones.Actions.enviarRequestComando<Object>({
                        cmd: ZCommon.Constants.CodigoComandoEnum.CM_DEFMENU,
                        buffer: 'azen',
                        idApl: idApl
                    }))
                        .then(
                        (resultadoCmDefMenu: ResultadoActionConDato<IZColaEventos>) => {                            
                            console.log('resultado menu');
                            console.log(resultadoCmDefMenu);
                            if(resultadoCmDefMenu.resultado == ZUtils.Constants.ResultadoAccionEnum.ERROR){
                                reject(resultadoCmDefMenu);
                                return;
                            }
                            const zmenu = resultadoCmDefMenu.retorno.eventos[0].dato.buffer.dato as IZMenu;                            
                            dispatch(ZMenu.Actions.ZMenuModule.setZMenu(zmenu));
                        }
                        );
                },
                () => { }
                );
        });
    }
}