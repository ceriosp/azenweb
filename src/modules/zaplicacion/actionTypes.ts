import {
    ZRecursoViewModel
} from '../zrecursos';

import {
    ZMenuItemModel
} from "../zmenu";

export type DESPACHAR_RECURSO = "zaplicacion/DESPACHAR_RECURSO";
export type CERRAR_RECURSO = "zaplicacion/CERRAR_RECURSO";

export class ActionTypes {
    public static readonly DESPACHAR_RECURSO: DESPACHAR_RECURSO = "zaplicacion/DESPACHAR_RECURSO";
    public static readonly CERRAR_RECURSO: CERRAR_RECURSO = "zaplicacion/CERRAR_RECURSO";
}

//Action parameters
export type Action =
    //UI  actions
    { type: DESPACHAR_RECURSO, zmenuItemModel: ZMenuItemModel }
    | { type: CERRAR_RECURSO, zrecursoViewModel: ZRecursoViewModel }