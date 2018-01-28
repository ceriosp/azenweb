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
        }

        export const CM_PXCREAR: Types.CM_PXCREAR = "zrecursos/CM_PXCREAR";

        export type Action =
        //UI  actions
        {
            type: Types.CM_PXCREAR,
            px:number,
            pilaPantexState: EntityNormalizedObj<IZPantexState>,
            zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
            zVentanaState: EntityNormalizedObj<IZVentanaState>,
            zCampoState: EntityNormalizedObj<IZCampoState>,
            zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>
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


    export namespace ZPantexState {

        export namespace Types {
            export type STORE = "IZPantexModule/ZPantexState/STORE";
            export type REMOVE = "IZPantexModule/ZPantexState/REMOVE";
            export type ADD_ZFT = "IZPantexModule/ZPantexState/ADD_ZFT";
        }

        export const STORE: Types.STORE = "IZPantexModule/ZPantexState/STORE";
        export const REMOVE: Types.REMOVE = "IZPantexModule/ZPantexState/REMOVE";
        export const ADD_ZFT: Types.ADD_ZFT = "IZPantexModule/ZPantexState/ADD_ZFT";

        export type Action =
            { type: Types.STORE, zPantexState: IZPantexState } |
            { type: Types.REMOVE, id: number } |
            { type: Types.ADD_ZFT, id: number, newZftId: number }
    }

    export namespace ZFormaTablaState {

        export namespace Types {
            export type STORE = "IZPantexModule/ZFormaTablaState/STORE";
            export type REMOVE = "IZPantexModule/ZFormaTablaState/REMOVE";
            export type ADD_ZCAMPO = "IZPantexModule/ZFormaTablaState/ADD_ZCAMPO";
            export type ADD_COMANDO_LINEST = "IZPantexModule/ZFormaTablaState/ADD_COMANDO_LINEST";
            export type ADD_COMANDO_BTNS = "IZPantexModule/ZFormaTablaState/ADD_COMANDO_BTNS";
            export type SET_IDZVENTANA = "IZPantexModule/ZFormaTablaState/SET_IDZVENTANA";
        }

        export const STORE: Types.STORE = "IZPantexModule/ZFormaTablaState/STORE";
        export const REMOVE: Types.REMOVE = "IZPantexModule/ZFormaTablaState/REMOVE";
        export const ADD_ZCAMPO: Types.ADD_ZCAMPO = "IZPantexModule/ZFormaTablaState/ADD_ZCAMPO";
        export const ADD_COMANDO_LINEST: Types.ADD_COMANDO_LINEST = "IZPantexModule/ZFormaTablaState/ADD_COMANDO_LINEST";
        export const ADD_COMANDO_BTNS: Types.ADD_COMANDO_BTNS = "IZPantexModule/ZFormaTablaState/ADD_COMANDO_BTNS";
        export const SET_IDZVENTANA: Types.SET_IDZVENTANA = "IZPantexModule/ZFormaTablaState/SET_IDZVENTANA";

        export type Action =
            { type: Types.STORE, zFormaTablaState: IZFormaTablaState } |
            { type: Types.REMOVE, id: number } |
            { type: Types.ADD_ZCAMPO, id: number, zcampoId: number } |
            { type: Types.ADD_COMANDO_LINEST, id: number, zcomandoId: number } |
            { type: Types.ADD_COMANDO_BTNS, id: number, zcomandoId: number } |
            { type: Types.SET_IDZVENTANA, id: number, zventanaId: number }
    }

    export namespace ZCampoState {

        export namespace Types {
            export type STORE = "IZPantexModule/ZCampoState/STORE";
            export type REMOVE = "IZPantexModule/ZCampoState/REMOVE";
        }

        export const STORE: Types.STORE = "IZPantexModule/ZCampoState/STORE";
        export const REMOVE: Types.REMOVE = "IZPantexModule/ZCampoState/REMOVE";

        export type Action =
            { type: Types.STORE, zCampoState: IZCampoState } |
            { type: Types.REMOVE, id: number }
    }

    export namespace ZComandoFormaState {

        export namespace Types {
            export type STORE = "IZPantexModule/ZComandoFormaState/STORE";
            export type REMOVE = "IZPantexModule/ZComandoFormaState/REMOVE";
        }

        export const STORE: Types.STORE = "IZPantexModule/ZComandoFormaState/STORE";
        export const REMOVE: Types.REMOVE = "IZPantexModule/ZComandoFormaState/REMOVE";

        export type Action =
            { type: Types.STORE, zComandoFormaState: IZComandoFormaState } |
            { type: Types.REMOVE, id: number }
    }

    export namespace ZVentanaState {

        export namespace Types {
            export type STORE = "IZPantexModule/ZVentanaState/STORE";
            export type REMOVE = "IZPantexModule/ZVentanaState/REMOVE";
        }

        export const STORE: Types.STORE = "IZPantexModule/ZVentanaState/STORE";
        export const REMOVE: Types.REMOVE = "IZPantexModule/ZVentanaState/REMOVE";

        export type Action =
            { type: Types.STORE, zVentanaState: IZVentanaState } |
            { type: Types.REMOVE, id: number }
    }

}