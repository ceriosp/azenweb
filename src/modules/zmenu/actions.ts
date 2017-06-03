import {
    ZMenuItemModel
} from '../zcommon';


import {    
    ActionTypes,
} from './actionTypes';


export namespace Actions
{
    export const cargarMenu = (appName: string):ActionTypes.Action => ({
        type:ActionTypes.CARGAR_MENU,
        appName:appName        
    });  

    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel):ActionTypes.Action => ({
        type:ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel:zmenuItemModel
    });  
}