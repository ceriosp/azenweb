export namespace ActionTypes {

    export namespace Types {
        export type SET_ESTAPROCESANDOREQUESTSERVIDOR = "zcomunicaciones/SET_ESTAPROCESANDOREQUESTSERVIDOR";
    }

    export const SET_ESTAPROCESANDOREQUESTSERVIDOR: Types.SET_ESTAPROCESANDOREQUESTSERVIDOR = "zcomunicaciones/SET_ESTAPROCESANDOREQUESTSERVIDOR";

    export type Action =
        { type: Types.SET_ESTAPROCESANDOREQUESTSERVIDOR, valor: boolean }

}