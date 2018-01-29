import {
    Constants as ZCommonConstants
} from "../zcommon/Constants";

import { ActionTypes } from "./actionTypes";

export namespace Actions {

    export const setIdApl = (idApl: string = null): ActionTypes.Action => ({
        type: ActionTypes.SET_IDAPL,
        idApl
    });

    export const setNomApl = (nomApl: string = null): ActionTypes.Action => ({
        type: ActionTypes.SET_NOMAPL,
        nomApl
    });

    export const setUltimoComandoEnviado = (cmd: ZCommonConstants.ComandoEnum): ActionTypes.Action => ({
        type: ActionTypes.SET_ULTIMOCOMANDOENVIADO,
        cmd
    });

}