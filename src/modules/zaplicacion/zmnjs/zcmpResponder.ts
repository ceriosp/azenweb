import * as ZCommon from '../../zcommon';
import { IZMenu, IZAplState, IZEvento } from '../../zcommon/contracts';

import { CM } from "../../zcommon/contracts";

import { Constants as ZPantexConstants } from "../../zpantex/constants";

export namespace ZcmpResponder {

    let querySelector: any;
    let zFormaTablaForm: HTMLFormElement;
    let zFormInput: any;

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommon.Constants.ComandoEnum.CM_SINCCAMPO:
                const dato = zEvento.dato.buffer.dato as CM.ISincCampo;

                querySelector = `#${ZPantexConstants.PX_PREFIJO_ID}${getState().zPantexModule.pxAlTope.toString()}${ZPantexConstants.ZFT_PREFIJO_ID}0`;

                if (!zFormaTablaForm) {
                    zFormaTablaForm = document.querySelector(querySelector) as HTMLFormElement;
                }

                zFormInput = zFormaTablaForm.elements.namedItem(dato.nc);

                if (zFormInput == null) {
                    break;
                }

                if (zFormInput.type == "text") {
                    zFormInput.value = dato.vc;
                    break;
                }

                break;
        }
    }

}    