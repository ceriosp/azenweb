import {
    ZMenuItemModel
} from "../zmenu";


import {    
    ZRecursoViewModel,
} from '../zrecursos';

import {    
    ActionTypes,
    Action,
} from './actionTypes';


export namespace Actions
{
    export const desparcharRecurso = (zmenuItemModel: ZMenuItemModel):Action => ({
        type:ActionTypes.DESPACHAR_RECURSO,
        zmenuItemModel:zmenuItemModel
    });

    export const cerrarRecurso = (zRecursoViewModel: ZRecursoViewModel):Action => ({
        type:ActionTypes.CERRAR_RECURSO,
        zrecursoViewModel:zRecursoViewModel
    });    
}
