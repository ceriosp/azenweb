import {
    ZMenuItemModel
} from "../zmenu";


import {    
    ZRecursoViewModel,
} from '../zrecursos';

import {    
    ActionTypes,
} from './actionTypes';


namespace Actions
{
    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel):ActionTypes.Action => ({
        type:ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel:zmenuItemModel
    });

    export const cerrarVentanaRecurso = (zRecursoViewModel: ZRecursoViewModel):ActionTypes.Action => ({
        type:ActionTypes.CERRAR_VENTANA_RECURSO,
        zrecursoViewModel:zRecursoViewModel
    });    
}

export
{
    Actions
}
