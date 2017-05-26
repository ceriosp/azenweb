import {
    ZMenuModel,
    ZMenuItemModel,

    ZMenuState,
} from '../zcommon';

import{
    ActionTypes
} from './actionTypes';


export namespace Reducers
{
    const initialState:ZMenuState =
    {
        zmenuModel:new ZMenuModel()
    }

    export const zmenuReducer = (zmenuSate:ZMenuState = initialState, action:ActionTypes.Action)=>{

        switch(action.type){
            case ActionTypes.DESPACHAR_OPCION_MENU:
                console.log("responder en zmenu reducer");
            break;
        }

        return zmenuSate;
    }
}