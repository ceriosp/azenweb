import {
    ZMenuItemModel
} from '../zcommon';

export namespace ActionTypes
{
    export namespace Types
    {
        export type DESPACHAR_OPCION_MENU = "zmenu/DESPACHAR_OPCION_MENU";
    }

    export const DESPACHAR_OPCION_MENU: Types.DESPACHAR_OPCION_MENU = "zmenu/DESPACHAR_OPCION_MENU";

    //Action parameters
    export type Action =
        //UI  actions
            { type: Types.DESPACHAR_OPCION_MENU, zmenuItemModel: ZMenuItemModel }
}