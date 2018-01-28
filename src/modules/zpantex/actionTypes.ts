import {
    ZMenuItemModel,
    ZRecursoViewModel,
    ZReferenciaViewModel,
    IZPantex,
    CM,
    Constants,
    IZPantexState,
    IZFormaTablaState,
    IZCampoState,
    IZComandoFormaState,
    IZVentanaState,
    EntityNormalizedObj
} from "../zcommon";

import * as ZMenu from '../zmenu';

export namespace ActionTypes {

    export namespace ZPantexModule {

        export namespace Types {
            export type CM_PXCREAR = "IZPantexModule/CM_PXCREAR";
            export type CM_PXARRIVAR = "IZPantexModule/CM_PXARRIVAR";
            export type SET_ESPXMODAL = "IZPantexModule/SET_ESPXMODAL";
            export type PX_DESTRUIR = "IZPantexModule/PX_DESTRUIR";
        }

        export const CM_PXCREAR: Types.CM_PXCREAR = "IZPantexModule/CM_PXCREAR";
        export const CM_PXARRIVAR: Types.CM_PXARRIVAR = "IZPantexModule/CM_PXARRIVAR";
        export const SET_ESPXMODAL: Types.SET_ESPXMODAL = "IZPantexModule/SET_ESPXMODAL";
        export const PX_DESTRUIR: Types.PX_DESTRUIR = "IZPantexModule/PX_DESTRUIR";

        export type Action =
            { type: Types.CM_PXCREAR, zPantex: IZPantex } |
            { type: Types.CM_PXARRIVAR, pxArrivar: CM.IPxArrivar } |
            { type: Types.SET_ESPXMODAL, esPxModal: boolean } |
            { type: Types.PX_DESTRUIR, pxDestruirParams: CM.IPxDestruir }
    }

    export namespace ZPantexStateModule {
        export namespace Types {
            export type CM_PXCREAR = "zrecursos/CM_PXCREAR";
            export type CM_PONERMODAL = "zrecursos/CM_PONERMODAL";
            
        }

        export const CM_PXCREAR: Types.CM_PXCREAR = "zrecursos/CM_PXCREAR";
        export const CM_PONERMODAL: Types.CM_PONERMODAL = "zrecursos/CM_PONERMODAL";

        export type Action =        
        {
            type: Types.CM_PXCREAR,
            px:number,
            pilaPantexState: EntityNormalizedObj<IZPantexState>,
            zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
            zVentanaState: EntityNormalizedObj<IZVentanaState>,
            zCampoState: EntityNormalizedObj<IZCampoState>,
            zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>
        } 
        |
        {
            type: Types.CM_PONERMODAL,
            ponerModal:boolean
        }        
    }

    export namespace Types {
        export type CERRAR_VENTANA_RECURSO = "zrecursos/CERRAR_VENTANA_RECURSO";
        export type ABRIR_VENTANA_ZOOM = "zrecursos/ABRIR_VENTANA_ZOOM";
    }

    export const CERRAR_VENTANA_RECURSO: Types.CERRAR_VENTANA_RECURSO = "zrecursos/CERRAR_VENTANA_RECURSO";
    export const ABRIR_VENTANA_ZOOM: Types.ABRIR_VENTANA_ZOOM = "zrecursos/ABRIR_VENTANA_ZOOM";

    //Action parameters
    export type Action =
        //UI  actions
        { type: ZMenu.ActionTypes.Types.DESPACHAR_OPCION_MENU, zmenuItemModel: ZMenuItemModel } |
        { type: Types.CERRAR_VENTANA_RECURSO, zrecursoViewModel: ZRecursoViewModel } |
        { type: Types.ABRIR_VENTANA_ZOOM, zreferenciaViewModel: ZReferenciaViewModel }
}