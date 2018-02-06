import { IZAplList, IZAplState, IZEnviarComandoParams, IZColaEventos } from "../zcommon/contracts";

import {
    ResultadoActionConDato
} from "../zutils/models";

import {
    ActionTypes,
} from './actionTypes';

import * as ZUtils from '../zutils';
import * as ZCommon from '../zcommon';
import * as ZAplicacion from '../zaplicacion';
import * as ZComunicaciones from '../zcomunicaciones';

import { Selectors } from './selectors';
import { debug } from "util";

export namespace Actions {

    export namespace ZLoginModule {

        export const login = () => (dispatch: (p: any) => any, getState: () => IZAplState) => {

            let zLoginModule = Selectors.getZLoginModule(getState());
            
            window.sessionStorage.setItem(ZCommon.Constants.AZEN_USER_SESSION_KEY, `${zLoginModule.username}`);

            dispatch(ZAplicacion.Actions.despacharEventoCliente(
                ZCommon.Constants.ComandoEnum.CM_ACEPTARLOGIN, 
                `<cm>LOGIN</cm><usr>${zLoginModule.username}</usr><vc>${zLoginModule.password}</vc>`
            ));
        }

        export const setUsername = (username: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_USERNAME,
            username
        });

        export const setPassword = (password: string): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_PASSWORD,
            password
        });

        export const setZAplList = (zAplList: IZAplList): ActionTypes.ZLoginModule.Action => ({
            type: ActionTypes.ZLoginModule.SET_ZAPLLIST,
            zAplList
        });
    }
}