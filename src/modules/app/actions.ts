import { ActionTypes } from "./actionTypes";

export namespace Actions {

    export const setIdApl = (idApl: string): ActionTypes.Action => ({
        type: ActionTypes.SET_IDAPL,
        idApl
    });

}