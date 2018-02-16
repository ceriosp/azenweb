import * as ZCommon from '../../zcommon';
import * as ZPantex from '../../zpantex';
import { IZPantex, IZMenu, IZAplState, IZEvento, CM } from '../../zcommon/contracts';
import { Services as ZCommonServices } from '../../zcommon/services';

import { Constants as ZPantexConstants } from "../../zpantex/constants";
import { debug } from 'util';

let commonServices: any = null;

export namespace ZftResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommon.Constants.ComandoEnum.CM_PXCREAR:
            case ZCommon.Constants.ComandoEnum.CM_PXCREARMENSAJE:            
            case ZCommon.Constants.ComandoEnum.CM_PXCREARZOOM:
            case ZCommon.Constants.ComandoEnum.CM_PXCREARMOV:
                const zPantex = zEvento.dato.buffer.dato as IZPantex;
                dispatch(ZPantex.Actions.ZPantexStateModule.pxCrear(zPantex, zEvento.dato.cmd));
                break;

            case ZCommon.Constants.ComandoEnum.CM_PXARRIVAR:

                const pxArrivarBuffer = zEvento.dato.buffer.dato as CM.IPxArrivar;

                const pxArrivarParams = {
                    px:pxArrivarBuffer.px
                } as CM.IPxArrivar;

                dispatch(ZPantex.Actions.ZPantexStateModule.cmPxArrivar(pxArrivarParams));

                break;

            case ZCommon.Constants.ComandoEnum.CM_PONERMODAL:
                const ponerModal = zEvento.dato.buffer.dato as CM.IPonerModal;

                if (ponerModal.px == getState().zPantexStateModule.pxAlTope) {
                    dispatch(ZPantex.Actions.ZPantexStateModule.ponerModal(true));
                }
                break;

            case ZCommon.Constants.ComandoEnum.CM_QUITARMODAL:
                const quitarModal = zEvento.dato.buffer.dato as CM.IQuitarModal;

                if (quitarModal.px == getState().zPantexStateModule.pxAlTope) {
                    dispatch(ZPantex.Actions.ZPantexStateModule.ponerModal(false));
                }
                break;

            case ZCommon.Constants.ComandoEnum.CM_PXDESTRUIR:
                const pxDestruir = zEvento.dato.buffer.dato as CM.IPxDestruir;
                dispatch(ZPantex.Actions.ZPantexStateModule.cmPxDestruir(pxDestruir));
                break;
        }
    }

    const changeZPantexTitle = (px: number, vc: string) => {

        if (commonServices == null) {
            commonServices = new ZCommonServices.ZCommonServices();
        }

        let pxTitleHeader = document.querySelector(commonServices.getZPantexTitleId(px, true));
        pxTitleHeader.textContent = vc;
    }

    const setZFormaTablaState = (setReadOnly: boolean, px: number, dispatch: (p: any) => any, getState: () => IZAplState) => {

        let zFormaTablaCount = getState().zPantexModule.pilaPantex[0].zFormaTablaList.length;
        let form: any;
        let arrayInput: any;

        if (commonServices == null) {
            commonServices = new ZCommonServices.ZCommonServices();
        }

        for (let i = 0; i < zFormaTablaCount; i++) {
            form = document.querySelector(commonServices.getZFormaTablaId(px, i, true));

            arrayInput = form.querySelectorAll('input');

            arrayInput.forEach((input: any) => {
                input.disabled = setReadOnly;
            });
        }
    }
}