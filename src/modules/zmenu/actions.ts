import * as ZUtils from '../zutils';
import { ResultadoActionConDato } from "../zutils/models";

import * as ZCommon from '../zcommon';
import { ZMenuItemModel, IZMenu } from '../zcommon';
import { IZAplState, IZColaEventos } from "../zcommon/contracts";

import * as ZComunicaciones from '../zcomunicaciones';

import * as ZAplicacion from '../zaplicacion';

import { ActionTypes } from './actionTypes';

export namespace Actions {

    export namespace ZMenuModule {

        export const setZMenu = (zmenu: IZMenu): ActionTypes.ZMenuModule.Action => ({
            type: ActionTypes.ZMenuModule.SET_ZMENU,
            zmenu
        });

    }

    export const lanzarMenu = () => (dispatch: (p: any) => any, getState: () => IZAplState) => {
        dispatch(ZAplicacion.Actions.despacharEventoCliente(ZCommon.Constants.ComandoEnum.CM_DEFMENU, getState().zLoginModule.username));
    }

    export const cargarMenu = (appName: string): ActionTypes.Action => ({
        type: ActionTypes.CARGAR_MENU,
        appName: appName
    });

    export const despacharOpcionMenu = (zmenuItemModel: ZMenuItemModel): ActionTypes.Action => ({
        type: ActionTypes.DESPACHAR_OPCION_MENU,
        zmenuItemModel: zmenuItemModel
    });
}