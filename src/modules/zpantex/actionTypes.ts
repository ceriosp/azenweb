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
    EntityNormalizedObj,
    ZFormaTablaState
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
            export type CM_PXCREAR = "ZPantexStateModule/CM_PXCREAR";
            export type CM_PONERMODAL = "ZPantexStateModule/CM_PONERMODAL";
            export type CM_PXARRIVAR = "ZPantexStateModule/CM_PXARRIVAR";
            export type CM_PXDESTRUIR = "ZPantexStateModule/CM_PXDESTRUIR";
            export type CM_SINCCAMPO = "ZPantexStateModule/CM_SINCCAMPO";

            export type ON_CAMPOCHANGE = "ZPantexStateModule/ON_CAMPOCHANGE";
            export type ON_CAMPORADIOCHANGE = "ZPantexStateModule/ON_CAMPORADIOCHANGE";
            export type ON_CAMPOCHECKBOXCHANGE = "ZPantexStateModule/ON_CAMPOCHECKBOXCHANGE";

            export type SET_ZCAMPOSTATE_HACAMBIADO = "ZPantexStateModule/SET_ZCAMPOSTATE_HACAMBIADO";
            export type SET_FILAMULTISELECCIONADA = "ZPantexStateModule/SET_FILAMULTISELECCIONADA";
            export type SET_COMANDOBUFFER = "ZPantexStateModule/SET_COMANDOBUFFER";
        }

        export const CM_PXCREAR: Types.CM_PXCREAR = "ZPantexStateModule/CM_PXCREAR";
        export const CM_PONERMODAL: Types.CM_PONERMODAL = "ZPantexStateModule/CM_PONERMODAL";
        export const CM_PXARRIVAR: Types.CM_PXARRIVAR = "ZPantexStateModule/CM_PXARRIVAR";
        export const CM_PXDESTRUIR: Types.CM_PXDESTRUIR = "ZPantexStateModule/CM_PXDESTRUIR";
        export const CM_SINCCAMPO: Types.CM_SINCCAMPO = "ZPantexStateModule/CM_SINCCAMPO";

        export const ON_CAMPOCHANGE: Types.ON_CAMPOCHANGE = "ZPantexStateModule/ON_CAMPOCHANGE";
        export const ON_CAMPORADIOCHANGE: Types.ON_CAMPORADIOCHANGE = "ZPantexStateModule/ON_CAMPORADIOCHANGE";
        export const ON_CAMPOCHECKBOXCHANGE: Types.ON_CAMPOCHECKBOXCHANGE = "ZPantexStateModule/ON_CAMPOCHECKBOXCHANGE";

        export const SET_ZCAMPOSTATE_HACAMBIADO: Types.SET_ZCAMPOSTATE_HACAMBIADO = "ZPantexStateModule/SET_ZCAMPOSTATE_HACAMBIADO";
        export const SET_FILAMULTISELECCIONADA: Types.SET_FILAMULTISELECCIONADA = "ZPantexStateModule/SET_FILAMULTISELECCIONADA";
        export const SET_COMANDOBUFFER: Types.SET_COMANDOBUFFER = "ZPantexStateModule/SET_COMANDOBUFFER";


        export type Action =
            {
                type: Types.CM_PXCREAR,
                px: number,
                pilaPantexState: EntityNormalizedObj<IZPantexState>,
                zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>,
                zVentanaState: EntityNormalizedObj<IZVentanaState>,
                zCampoState: EntityNormalizedObj<IZCampoState>,
                zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>
            } |
            {
                type: Types.CM_PONERMODAL,
                ponerModal: boolean
            } |
            {
                type: Types.CM_PXARRIVAR,
                pxArrivarParams: CM.IPxArrivar
            } |
            {
                type: Types.CM_PXDESTRUIR,
                pxDestruirParams: CM.IPxDestruir
            } |
            {
                type: Types.CM_SINCCAMPO,

                listaPxCampos: Array<number>,
                hashZCampos: Map<string, IZCampoState>,

                listaPxComandos: Array<number>,
                hashZComandos: Map<Constants.ComandoEnum, IZComandoFormaState>
            } |
            {
                type: Types.ON_CAMPOCHANGE,
                zcampoState: IZCampoState,
                valor: any
            } |
            {
                type: Types.ON_CAMPORADIOCHANGE,
                zcampoState: IZCampoState,
                valor: string
            } |
            {
                type: Types.ON_CAMPOCHECKBOXCHANGE,
                zcampoState: IZCampoState,
                valor: boolean
            } |
            {
                type: Types.SET_ZCAMPOSTATE_HACAMBIADO,
                idZCampoState: number,
                haCambiado: boolean
            }|
            {
                type: Types.SET_FILAMULTISELECCIONADA,
                zFormaTablaState: IZFormaTablaState,
                indexFilaMultiSeleccionada: number
            }|
            {
                type: Types.SET_COMANDOBUFFER,
                cm: Constants.ComandoEnum,
                buffer: string
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