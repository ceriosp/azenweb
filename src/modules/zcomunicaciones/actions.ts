import { 
    ResultadoActionConDato, ResultadoAction 
} from "../zutils";

import { Services } from "./services";
import { IColaEventos } from "./models";

export namespace Actions {

    export const lanzarAplicacion = (identificadorAplicacion: string) => (dispatch: any, getState:any) => {
        
        Services.lanzarAplicacion(identificadorAplicacion).then(
            (resultadoActionConDato:ResultadoActionConDato<IColaEventos>) => { //OK
                console.log("EXITO lanzar aplicacion");
                console.log(resultadoActionConDato);
            },
            (resultadoActionError:ResultadoAction) => { //ERROR
                
            }
        );
    }

}