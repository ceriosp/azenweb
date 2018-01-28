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

            case ZCommon.Constants.ComandoEnum.CM_PXCREARMENSAJE:
            case ZCommon.Constants.ComandoEnum.CM_PXCREAR:
                const zPantex = zEvento.dato.buffer.dato as IZPantex;
                dispatch(ZPantex.Actions.ZPantexModule.pxCrear(zPantex));
                break;

            case ZCommon.Constants.ComandoEnum.CM_PXARRIVAR:

                const pxArrivarBuffer = zEvento.dato.buffer.dato as CM.IPxArrivar;

                const pxArrivarParams = {
                    px:pxArrivarBuffer.px
                } as CM.IPxArrivar;

                dispatch(ZPantex.Actions.ZPantexModule.pxArrivar(pxArrivarParams));

                break;

            case ZCommon.Constants.ComandoEnum.CM_PONERMODAL:
                const ponerModal = zEvento.dato.buffer.dato as CM.IPonerModal;

                if (ponerModal.px == getState().zPantexModule.pxAlTope) {
                    dispatch(ZPantex.Actions.ZPantexModule.setEsPxModal(true));
                }
                break;

            case ZCommon.Constants.ComandoEnum.CM_QUITARMODAL:
                const quitarModal = zEvento.dato.buffer.dato as CM.IQuitarModal;

                if (quitarModal.px == getState().zPantexModule.pxAlTope) {
                    dispatch(ZPantex.Actions.ZPantexModule.setEsPxModal(false));
                }
                break;
/*
            case ZCommon.Constants.ComandoEnum.CM_CONSULTAR:
                const consultar = zEvento.dato.buffer.dato as CM.IConsultar;
                changeZPantexTitle(consultar.px, consultar.vc);
                setZFormaTablaState(true, consultar.px, dispatch, getState);
                break;

            case ZCommon.Constants.ComandoEnum.CM_ADICIONAR:
                const adicionar = zEvento.dato.buffer.dato as CM.IAdicionar;
                changeZPantexTitle(adicionar.px, adicionar.vc);
                setZFormaTablaState(false, adicionar.px, dispatch, getState);
                break;

            case ZCommon.Constants.ComandoEnum.CM_MODIFICAR:
                const modificar = zEvento.dato.buffer.dato as CM.IModificar;
                changeZPantexTitle(modificar.px, modificar.vc);
                setZFormaTablaState(false, modificar.px, dispatch, getState);
                break;
*/
            case ZCommon.Constants.ComandoEnum.CM_PXDESTRUIR:
                const pxDestruir = zEvento.dato.buffer.dato as CM.IPxDestruir;
                dispatch(ZPantex.Actions.ZPantexModule.pxDestruir(pxDestruir));
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