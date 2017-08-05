import { IZMenu } from "../zcommon/contracts";

export namespace ActionTypes {

    export namespace ZMenuModule {

        export namespace Types {
            export type SET_ZMENU = "IZMenuModule/SET_ZMENU";
        }

        export const SET_ZMENU: Types.SET_ZMENU = "IZMenuModule/SET_ZMENU";

        export type Action =
            { type: Types.SET_ZMENU, zmenu: IZMenu }
    }
}