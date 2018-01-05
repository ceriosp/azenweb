export namespace ActionTypes {

    export namespace ZrptModule {

        export namespace Types {
            export type SET_MOSTRARREPORTE = "zrpt/SET_MOSTRARREPORTE";
            export type SET_RUTAREPORTE = "zrpt/SET_RUTAREPORTE";
        }

        export const SET_MOSTRARREPORTE: Types.SET_MOSTRARREPORTE = "zrpt/SET_MOSTRARREPORTE";
        export const SET_RUTAREPORTE: Types.SET_RUTAREPORTE = "zrpt/SET_RUTAREPORTE";

        export type Action =
            { type: Types.SET_MOSTRARREPORTE, mostrarReporte: boolean } |
            { type: Types.SET_RUTAREPORTE, rutaReporte: string }
    }
    
}