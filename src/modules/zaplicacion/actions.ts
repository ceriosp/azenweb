import {
    ZMenuItemModel,
    ZRecursoViewModel
} from "../zcommon";

import * as ZMenu from '../zmenu';

import {    
    ActionTypes,
} from './actionTypes';


export namespace Actions
{
    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel):ActionTypes.Action => ({
        type: ZMenu.ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel:zmenuItemModel
    });

    export const cerrarVentanaRecurso = (zRecursoViewModel: ZRecursoViewModel):ActionTypes.Action => ({
        type:ActionTypes.CERRAR_VENTANA_RECURSO,
        zrecursoViewModel:zRecursoViewModel
    });    
}