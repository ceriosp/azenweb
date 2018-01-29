
import {
    Constants as ZCommonConstants
} from "../zcommon/Constants";

export namespace ActionTypes {

    export namespace Types {
        export type SET_IDAPL = "App/SET_IDAPL";
        export type SET_NOMAPL = "App/SET_NOMAPL";
        export type SET_ULTIMOCOMANDOENVIADO = "App/SET_ULTIMOCOMANDOENVIADO";
        

        
    }

    export const SET_IDAPL: Types.SET_IDAPL = "App/SET_IDAPL";
    export const SET_NOMAPL: Types.SET_NOMAPL = "App/SET_NOMAPL";
    export const SET_ULTIMOCOMANDOENVIADO: Types.SET_ULTIMOCOMANDOENVIADO = "App/SET_ULTIMOCOMANDOENVIADO";
    
    export type Action =
        { type: Types.SET_IDAPL, idApl: string } |
        { type: Types.SET_NOMAPL, nomApl: string } |
        { type: Types.SET_ULTIMOCOMANDOENVIADO, cmd: ZCommonConstants.ComandoEnum } 
}