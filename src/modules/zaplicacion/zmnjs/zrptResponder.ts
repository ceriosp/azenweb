import * as ZCommon from '../../zcommon';
import * as ZPantex from '../../zpantex';
import { IZPantex, IZMenu, IZAplState, IZEvento, CM } from '../../zcommon/contracts';
import { Services as ZCommonServices } from '../../zcommon/services';

import { Constants as ZPantexConstants } from "../../zpantex/constants";
import { debug } from 'util';

import { Actions as ZrptActions } from "../../zrpt/actions";

let commonServices: any = null;

export namespace ZrptResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommon.Constants.ComandoEnum.CM_PXVISUALIZARRPT:
                let visualizarRtp = zEvento.dato.buffer.dato as ZCommon.CM.IPxVisualizarRpt
                
                dispatch(ZrptActions.ZrptModule.setMostrarReporte(true));
                dispatch(ZrptActions.ZrptModule.setRutaReporte(visualizarRtp.vc));
                break;
        }
    }
}