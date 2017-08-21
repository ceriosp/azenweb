import { Reducer, combineReducers } from 'redux';
import { IZAplState } from "../zcommon/contracts";

import * as ZComunicaciones from '../zcomunicaciones';
import * as ZLogin from '../zlogin';
import * as ZMenu from '../zmenu';
import * as ZPantex from '../zpantex';

export namespace Reducers {

    export const estaProcesandoRequestServidor = (state: boolean = false, action: ZComunicaciones.ActionTypes.Action): boolean => {

        switch (action.type) {
            case ZComunicaciones.ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR:
                return action.valor;
        }

        return state;
    }

    export const zaplState: Reducer<IZAplState> = combineReducers<IZAplState>({
        estaProcesandoRequestServidor: estaProcesandoRequestServidor,
        zMenuModule: ZMenu.Reducers.ZMenuModule.impl,
        zPantexModule: ZPantex.Reducers.ZPantexModule.impl,
        zLoginModule: ZLogin.Reducers.ZLoginModule.impl,
    });
}