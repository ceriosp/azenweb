import {
    ZMenuItemModel,
    ZRecursoViewModel
} from "../zcommon";

import * as ZMenu from '../zmenu';

export namespace ActionTypes
{
    export namespace Types
    {
        export type CERRAR_VENTANA_RECURSO = "zaplicacion/CERRAR_VENTANA_RECURSO";
    }

    export const CERRAR_VENTANA_RECURSO: Types.CERRAR_VENTANA_RECURSO = "zaplicacion/CERRAR_VENTANA_RECURSO";

    //Action parameters
    export type Action =
        //UI  actions
            { type: ZMenu.ActionTypes.Types.DESPACHAR_OPCION_MENU, zmenuItemModel: ZMenuItemModel }
        |   { type: Types.CERRAR_VENTANA_RECURSO, zrecursoViewModel: ZRecursoViewModel }    
}