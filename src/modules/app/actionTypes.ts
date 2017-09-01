export namespace ActionTypes {

    export namespace Types {
        export type SET_IDAPL = "zcomunicaciones/SET_IDAPL";
    }

    export const SET_IDAPL: Types.SET_IDAPL = "zcomunicaciones/SET_IDAPL";

    export type Action =
        { type: Types.SET_IDAPL, idApl: string }

}