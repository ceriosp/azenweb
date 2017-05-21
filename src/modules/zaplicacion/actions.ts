import {
    ZMenuItemModel
} from "../zmenu";

import {
    ActionTypes,
    DESPACHAR_RECURSO,
} from './actionTypes';

//Action parameters
export type Action =
    //UI  actions
    { type: DESPACHAR_RECURSO, zmenuItemModel: ZMenuItemModel }

export namespace Actions
{
    export const desparcharRecurso = (zmenuItemModel: ZMenuItemModel):Action => ({
        type:ActionTypes.DESPACHAR_RECURSO,
        zmenuItemModel:zmenuItemModel
    });
}
