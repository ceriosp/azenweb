import {
    ZMenuItemModel, IZMenu
} from '../zcommon';


import {
    ActionTypes,
} from './actionTypes';


export namespace Actions {

    export namespace ZMenuModule {

        export const setZMenu = (zmenu: IZMenu): ActionTypes.ZMenuModule.Action => ({
            type: ActionTypes.ZMenuModule.SET_ZMENU,
            zmenu
        });

    }

    export const cargarMenu = (appName: string): ActionTypes.Action => ({
        type: ActionTypes.CARGAR_MENU,
        appName: appName
    });

    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel): ActionTypes.Action => ({
        type: ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel: zmenuItemModel
    });
}