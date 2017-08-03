export namespace ActionTypes {

    export namespace Types {
        export type CM_APLICACION = "zcomunicaciones/CM_APLICACION";
    }

    export const CM_APLICACION: Types.CM_APLICACION = "zcomunicaciones/CM_APLICACION";

     export type Action =
            { type: Types.CM_APLICACION, identificadorAplicacion:string }

}