
import { Reducer } from 'redux';

import * as ZCommon from '../zcommon';
import {
    ZMenuModel,
    ZMenuItemModel,

    ZRecursoModel,
    ZRecursoViewModel,

    ZAplicationState,

} from '../zcommon';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zrecursos";

import { ActionTypes } from './actionTypes';
import * as ZAplication from './index';

export namespace Reducers {

    const initialState: ZAplicationState = {
        mostrandoVentanaModal:false,
        mapRecursosIndxById: new Map<string, ZRecursoViewModel>(),
        mapRecursosZoomIndxById: new Map<string, ZRecursoViewModel>(),
        recursosActivosIds: Array<string>()
    }

    export const ZAplicacionReducer: Reducer<ZAplicationState> =
        (zaplicationState: ZAplicationState = initialState, action: ActionTypes.Action): ZAplicationState => {

            switch (action.type) {

                case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:
                    return despacharRecurso(zaplicationState, action);

                case ActionTypes.CERRAR_VENTANA_RECURSO:
                    return cerrarRecurso(zaplicationState, action);

             case ActionTypes.ABRIR_VENTANA_ZOOM:
                    return abrirVentanaZoom(zaplicationState, action);

                default:
                    return zaplicationState;
            }
        }

    const despacharRecurso =
        (zaplicationState: ZAplicationState, action: ActionTypes.Action): ZAplicationState => {

            if (action.type != ZMenu.ActionTypes.DESPACHAR_OPCION_MENU) {
                return zaplicationState;
            }            

            let idRecurso: string = action.zmenuItemModel.ctx;
            let zaplicacionService = new ZAplication.Services.ZAplicacionService();
            let resultMap = zaplicacionService.abrirVentanaRecurso(ZCommon.Constants.TipoRecurso.Basico, idRecurso, zaplicationState.mapRecursosIndxById);
            
            return { ...zaplicationState, mapRecursosIndxById: resultMap } as ZAplicationState;
        }


    const cerrarRecurso = (zaplicationState: ZAplicationState, action: ActionTypes.Action): ZAplicationState => {        

        if (action.type != ActionTypes.CERRAR_VENTANA_RECURSO) {
            return zaplicationState;
        }        

        const idRecurso:string = action.zrecursoViewModel.ctx;



        let mapRecursosIndxById = action.zrecursoViewModel.tipoRecurso == ZCommon.Constants.TipoRecurso.Basico 
                                    ? zaplicationState.mapRecursosIndxById
                                    : zaplicationState.mapRecursosZoomIndxById;
                                    
        let zaplicacionService = new ZAplication.Services.ZAplicacionService();

        let abrirSiguiente = action.zrecursoViewModel.tipoRecurso == ZCommon.Constants.TipoRecurso.Basico;        
        let newMapRecursosIndxByCtx = zaplicacionService.cerrarVentanaRecurso(idRecurso, mapRecursosIndxById, abrirSiguiente);        

        if(action.zrecursoViewModel.tipoRecurso == ZCommon.Constants.TipoRecurso.Basico){
            return { ...zaplicationState, mapRecursosIndxById: newMapRecursosIndxByCtx };
        }

        return { 
            ...zaplicationState, 
            mapRecursosZoomIndxById: newMapRecursosIndxByCtx,
            mostrandoVentanaModal:false
        };        
    }

    const abrirVentanaZoom =
        (zaplicationState: ZAplicationState, action: ActionTypes.Action): ZAplicationState => {

            if (action.type != ZAplication.ActionTypes.ABRIR_VENTANA_ZOOM) {
                return zaplicationState;
            }            

            let idRecurso: string = action.zreferenciaViewModel.nomRcrZoom;
            let zaplicacionService = new ZAplication.Services.ZAplicacionService();
            let resultMap = zaplicacionService.abrirVentanaRecurso(ZCommon.Constants.TipoRecurso.Zoom, idRecurso, zaplicationState.mapRecursosZoomIndxById);
            
            return { 
                    ...zaplicationState, 
                    mapRecursosZoomIndxById: resultMap,
                    mostrandoVentanaModal:true,
                } as ZAplicationState;
        }
}

