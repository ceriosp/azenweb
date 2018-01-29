import { Reducer, combineReducers } from 'redux';
import { IZAplState } from "../zcommon/contracts";

import * as ZComunicaciones from '../zcomunicaciones';
import * as ZLogin from '../zlogin';
import * as ZMenu from '../zmenu';
import * as ZPantex from '../zpantex';
import * as Zrpt from '../zrpt';

import { ActionTypes } from "./actionTypes";

import * as ZCommon from "../zcommon";
import { start } from 'repl';

export namespace Reducers {

    export const idApl = (state: string = null, action: ActionTypes.Action): string => {

        switch (action.type) {
            case ActionTypes.SET_IDAPL:
                return action.idApl;
        }

        return state;
    }

    export const nomApl = (state: string = null, action: ActionTypes.Action): string => {

        switch (action.type) {
            case ActionTypes.SET_NOMAPL:
                return action.nomApl
        }

        return state;
    }

    export const ultimoComandoEnviado = (state: ZCommon.Constants.ComandoEnum = null, action: ActionTypes.Action): ZCommon.Constants.ComandoEnum => {

        switch (action.type) {
            case ActionTypes.SET_ULTIMOCOMANDOENVIADO:
                return action.cmd
        }

        return state;
    }

    export const tipoAJAXIndicador = (state: ZCommon.Constants.TipoAJAXIndicadorEnum = ZCommon.Constants.TipoAJAXIndicadorEnum.NIGUNO, action: ZComunicaciones.ActionTypes.Action): ZCommon.Constants.TipoAJAXIndicadorEnum => {

        switch (action.type) {
            case ZComunicaciones.ActionTypes.SET_TIPOAJAXINDICADOR:
                return action.tipoAJAXIndicador
        }

        return state;
    }

    export const estaProcesandoRequestServidor = (state: boolean = false, action: ZComunicaciones.ActionTypes.Action): boolean => {
        
        switch (action.type) {
            case ZComunicaciones.ActionTypes.SET_ESTAPROCESANDOREQUESTSERVIDOR:
                return action.valor;
        }

        return state;
    }

    export const zaplState: Reducer<IZAplState> = combineReducers<IZAplState>({
        idApl: idApl,
        nomApl: nomApl,
        tipoAJAXIndicador: tipoAJAXIndicador,
        ultimoComandoEnviado:ultimoComandoEnviado,
        estaProcesandoRequestServidor: estaProcesandoRequestServidor,
        zMenuModule: ZMenu.Reducers.ZMenuModule.impl,
        zPantexModule: ZPantex.Reducers.ZPantexModule.impl,
        zPantexStateModule: ZPantex.Reducers.ZPantexStateModule.impl,
        zLoginModule: ZLogin.Reducers.ZLoginModule.impl,
        zrptModule: Zrpt.Reducers.ZrptModule.impl
    });
}