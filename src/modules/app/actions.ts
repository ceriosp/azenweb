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

}