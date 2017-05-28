
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
        mostrandoVentanaModal: false,
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
                    return cerrarVentanaRecurso(zaplicationState, action);

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


    const cerrarVentanaRecurso = (zaplicationState: ZAplicationState, action: ActionTypes.Action): ZAplicationState => {

        if (action.type != ActionTypes.CERRAR_VENTANA_RECURSO) {
            return zaplicationState;
        }

        switch(action.zrecursoViewModel.tipoRecurso)
        {
            case ZCommon.Constants.TipoRecurso.Basico:
                return cerrarVentanaRecursoBasico(zaplicationState, action);

            case ZCommon.Constants.TipoRecurso.Zoom:
                return cerrarVentanaRecursZoom(zaplicationState, action);
        }
    }

    const cerrarVentanaRecursoBasico = (zaplicationState: ZAplicationState, action: ActionTypes.Action): ZAplicationState => {

        if (action.type != ActionTypes.CERRAR_VENTANA_RECURSO) {
            return zaplicationState;
        }

        const idRecurso: string = action.zrecursoViewModel.ctx;
        let mapRecursosIndxById = zaplicationState.mapRecursosIndxById;
        let zaplicacionService = new ZAplication.Services.ZAplicacionService();
        let abrirSiguienteVentana = true;
        let newMapRecursosIndxByCtx = zaplicacionService.cerrarVentanaRecurso(idRecurso, mapRecursosIndxById, abrirSiguienteVentana);

        return { ...zaplicationState, mapRecursosIndxById: newMapRecursosIndxByCtx };
    }

    const cerrarVentanaRecursZoom = (zaplicationState: ZAplicationState, action: ActionTypes.Action): ZAplicationState => {

        if (action.type != ActionTypes.CERRAR_VENTANA_RECURSO) {
            return zaplicationState;
        }

        const idRecurso: string = action.zrecursoViewModel.ctx;
        let mapRecursosIndxById = zaplicationState.mapRecursosZoomIndxById;
        let zaplicacionService = new ZAplication.Services.ZAplicacionService();
        let abrirSiguienteVentana = false;
        let newMapRecursosIndxByCtx = zaplicacionService.cerrarVentanaRecurso(idRecurso, mapRecursosIndxById, abrirSiguienteVentana);

        return {
            ...zaplicationState,
            mapRecursosZoomIndxById: newMapRecursosIndxByCtx,
            mostrandoVentanaModal: false
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
                mostrandoVentanaModal: true,
            } as ZAplicationState;
        }
}

