import { Reducer, combineReducers } from 'redux';

import * as ZCommon from '../zcommon';
import {

    //models
    ZMenuModel,
    ZMenuItemModel,

    ZRecursoModel,
    ZRecursoViewModel,

    //state
    ZAplicationState,

    //Utils
    EntityNormalizedObj

} from '../zcommon';

import * as ZRecursos from '../zpantex';

import * as ZMenu from '../zmenu';

import {
    Services,
    Constants
} from "../zpantex";

import * as ZAplication from './index';

export namespace Reducers {

    export const zaplicacionReducer = (state: ZAplicationState = {} as ZAplicationState, action: any): ZAplicationState => {

        switch (action.type) {
            case ZMenu.ActionTypes.DESPACHAR_OPCION_MENU:
                return {
                    ...state,
                    mostrandoVentanaModal: false,
                    recursosViewModel: ZRecursos.Reducers.recursosViewModel.recursosViewModel(state.recursosViewModel, action)
                };
        }

        return state;
    }
}

