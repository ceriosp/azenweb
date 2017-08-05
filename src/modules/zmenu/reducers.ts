const u = require('updeep');

import {
    IZMenuModule,
} from '../zcommon/contracts';

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

    export namespace ZMenuModule {

        const zMenuModule = {
            visible: true,
            zmenu:{
                menu:[]
            }
        } as IZMenuModule;

        export const impl = (state: IZMenuModule = zMenuModule, action: ActionTypes.ZMenuModule.Action) => {

            switch (action.type) {
                case ActionTypes.ZMenuModule.SET_ZMENU:
                    return u({
                        zmenu:action.zmenu
                    } as IZMenuModule, state);

                case ActionTypes.ZMenuModule.SET_VISIBLE:
                    return u({
                        visible:action.visible
                    } as IZMenuModule, state);                    
            }

            return state;
        }
    }



















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