import {
    ZMenuModel,
    ZMenuItemModel,

    ZMenuState,
} from '../zcommon';

import {
    ActionTypes
} from './actionTypes';

import {
    Services
} from './services';


export namespace Reducers {
    const initialState: ZMenuState = {
        zmenuModel: new ZMenuModel()
    }

    export const zmenuReducer = (zmenuState: ZMenuState = initialState, action: ActionTypes.Action): ZMenuState => {

        switch (action.type) {

            case ActionTypes.CARGAR_MENU:
                return cargarMenu(zmenuState, action);

            case ActionTypes.DESPACHAR_OPCION_MENU:
                break;
        }

        return zmenuState;
    }

    const cargarMenu = (zmenuSate: ZMenuState = initialState, action: ActionTypes.Action): ZMenuState => {

        if (action.type != ActionTypes.CARGAR_MENU) {
            return zmenuSate;
        }

        let zmenuService = new Services.ZMenuService();

        return zmenuService.getZMenuState();
    }
}