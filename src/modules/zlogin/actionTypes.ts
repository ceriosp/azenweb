import {
    IZAplList
} from "../zcommon/contracts";

import {
    ResultadoAction
} from "../zutils/models";

export namespace ActionTypes {

    export namespace ZLoginModule {

        export namespace Types {
            export type SET_USERNAME = "zlogin/SET_USERNAME";
            export type SET_PASSWORD = "zlogin/SET_PASSWORD";
            export type SET_APLLIST = "zlogin/SET_APLLIST";
            export type SET_RESULTADOACTION = "zlogin/SET_RESULTADOACTION";
        }

        export const SET_USERNAME: Types.SET_USERNAME = "zlogin/SET_USERNAME";
        export const SET_PASSWORD: Types.SET_PASSWORD = "zlogin/SET_PASSWORD";
        export const SET_APLLIST: Types.SET_APLLIST = "zlogin/SET_APLLIST";
        export const SET_RESULTADOACTION: Types.SET_RESULTADOACTION = "zlogin/SET_RESULTADOACTION";

        export type Action =
            { type: Types.SET_USERNAME, username: string } |
            { type: Types.SET_PASSWORD, password: string } |
            { type: Types.SET_APLLIST, aplList: IZAplList } |
            { type: Types.SET_RESULTADOACTION, resultadoAction: ResultadoAction }
    }
    
}