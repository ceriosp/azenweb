import { Reducer, combineReducers } from 'redux';
import { IZAplState } from "../zcommon/contracts";

import * as ZMenu from '../zmenu'; 
import * as ZComunicaciones from '../zcomunicaciones'; 

export namespace Reducers {

    export const estaProcesandoRequestServidor = (state: boolean = false, action: ZComunicaciones.ActionTypes.Action): boolean => {

        switch (action.type) {
            case ZComunicaciones.ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR:
                return action.valor;
        }

        return state;
    }
    
    export const zaplState : Reducer<IZAplState> = combineReducers<IZAplState>({
        estaProcesandoRequestServidor:estaProcesandoRequestServidor as any,
        zMenuModule: ZMenu.Reducers.ZMenuModule.impl as any
    });
}