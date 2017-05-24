import {
    ZRecursoViewModel
} from '../zrecursos';

import {
    ZMenuItemModel
} from "../zmenu";

namespace ActionTypes
{
    export namespace Types
    {
        export type DESPACHAR_OPCION_MENU = "zaplicacion/DESPACHAR_OPCION_MENU";
        export type CERRAR_VENTANA_RECURSO = "zaplicacion/CERRAR_VENTANA_RECURSO";
    }

    export const DESPACHAR_OPCION_MENU: Types.DESPACHAR_OPCION_MENU = "zaplicacion/DESPACHAR_OPCION_MENU";
    export const CERRAR_VENTANA_RECURSO: Types.CERRAR_VENTANA_RECURSO = "zaplicacion/CERRAR_VENTANA_RECURSO";

    //Action parameters
    export type Action =
        //UI  actions
            { type: Types.DESPACHAR_OPCION_MENU, zmenuItemModel: ZMenuItemModel }
        |   { type: Types.CERRAR_VENTANA_RECURSO, zrecursoViewModel: ZRecursoViewModel }    
}

export
{
    ActionTypes
}