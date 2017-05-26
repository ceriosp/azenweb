import {
    ZMenuItemModel
} from '../zcommon';


import {    
    ActionTypes,
} from './actionTypes';


export namespace Actions
{
    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel):ActionTypes.Action => ({
        type:ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel:zmenuItemModel
    });  
}