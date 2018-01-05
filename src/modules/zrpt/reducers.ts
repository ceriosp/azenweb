const u = require('updeep');

import {
    IZAplList,
    IZrptModule
} from "../zcommon/contracts";

import {
    ResultadoAction
} from "../zutils/models";

import {
    ActionTypes
} from './actionTypes';

export namespace Reducers {

    export namespace ZrptModule {

        const zrptModule = {
            mostrarReporte: false,
            rutaReporte: ''
        } as IZrptModule;

        export const impl = (state: IZrptModule = zrptModule, action: ActionTypes.ZrptModule.Action) => {

            switch (action.type) {

                case ActionTypes.ZrptModule.SET_MOSTRARREPORTE:
                    return u({
                        mostrarReporte: action.mostrarReporte
                    } as IZrptModule, state);

                case ActionTypes.ZrptModule.SET_RUTAREPORTE:
                    return u({
                        rutaReporte: action.rutaReporte
                    } as IZrptModule, state);
            }

            return state;
        }
    }

}