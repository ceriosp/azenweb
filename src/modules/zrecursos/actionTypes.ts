import {
    ZMenuItemModel,
    ZRecursoViewModel,
    ZReferenciaViewModel
} from "../zcommon";

import * as ZMenu from '../zmenu';

export namespace ActionTypes
{
    export namespace Types
    {
        export type CERRAR_VENTANA_RECURSO = "zrecursos/CERRAR_VENTANA_RECURSO";
        export type ABRIR_VENTANA_ZOOM = "zrecursos/ABRIR_VENTANA_ZOOM";
    }

    export const CERRAR_VENTANA_RECURSO: Types.CERRAR_VENTANA_RECURSO = "zrecursos/CERRAR_VENTANA_RECURSO";
    export const ABRIR_VENTANA_ZOOM: Types.ABRIR_VENTANA_ZOOM = "zrecursos/ABRIR_VENTANA_ZOOM";

    //Action parameters
    export type Action =
        //UI  actions
            { type: ZMenu.ActionTypes.Types.DESPACHAR_OPCION_MENU, zmenuItemModel: ZMenuItemModel }
        |   { type: Types.CERRAR_VENTANA_RECURSO, zrecursoViewModel: ZRecursoViewModel }    
        |   { type: Types.ABRIR_VENTANA_ZOOM, zreferenciaViewModel: ZReferenciaViewModel }    
}