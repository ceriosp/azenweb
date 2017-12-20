import {
    IZAplState,
    IZEvento,
    IZCampo,
    CM
} from '../../zcommon/contracts';
import { Constants as ZCommonConstants } from "../../zcommon";
import { Constants as ZPantexConstants } from "../../zpantex";

import { Services } from "../services";
import { debug } from 'util';

let zftFormInputElement: any;
let zftCampo: any;

export namespace ZcmpResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommonConstants.ComandoEnum.CM_SINCCAMPO:
                sincronizarCampo(zEvento, dispatch, getState);
                break;
        }
    }

    const sincronizarCampo = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        const dato = zEvento.dato.buffer.dato as CM.ISincCampo;

        let querySelector = `#${ZPantexConstants.PX_PREFIJO_ID}${getState().zPantexModule.pxAlTope.toString()}${ZPantexConstants.ZFT_PREFIJO_ID}0`;

        let zftFormElement = document.querySelector(querySelector) as HTMLFormElement;
        let zftCamposState = getState().zPantexModule.pilaPantex[dato.px - 1].zFormaTablaList[dato.rg - 1].cmps as Array<IZCampo>;

        zftFormInputElement = zftFormElement.elements[dato.nc as any];

        if (zftFormInputElement) {
            zftCampo = Services.Responder.obtenerDefinicionesCampo(zftCamposState, dato);

            if (!zftCampo) {
                return;
            }

            if (zftCampo.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
                sincronizarTextBox(dato);
                return;
            }

            if (zftCampo.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_RADIO) {
                sincronizarRadio(dato);
                return;
            }

            if (zftCampo.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
                return;
            }

            if (zftCampo.length > 0) {

                if (zftCampo[0].claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
                    sincronizarCamposTextBox(dato, zftCampo);
                    return;
                }

                if (zftCampo[0].claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_RADIO) {
                    sincronizarRadio(dato);
                    return;
                }

                if (zftCampo[0].claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
                    sincronizarCheckBox(dato);
                    return;
                }
            }
        }
    }

    const sincronizarTextBox = (dato: CM.ISincCampo) => {
        zftFormInputElement.value = dato.vc;
    }

    const sincronizarCamposTextBox = (dato: CM.ISincCampo, zCampo: Array<IZCampo>) => {
        zCampo.forEach((campo: IZCampo) => {
            if (zftFormInputElement.name == dato.nc) {
                zftFormInputElement.value = dato.vc;
            }
        });
    }

    const sincronizarRadio = (dato: CM.ISincCampo) => {
        zftFormInputElement.forEach((element: any) => {
            if (element.value == dato.pb) {
                element.checked = dato.vc == "*" ? true : false;
            }
        });
    }

    const sincronizarCheckBox = (dato: CM.ISincCampo) => {
        zftFormInputElement.forEach((element: any) => {
            if (element.value == dato.pb) {
                element.checked = dato.vc == "X" ? true : false;
            }
        });
    }

}