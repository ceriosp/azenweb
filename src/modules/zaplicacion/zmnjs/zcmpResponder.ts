import {
    IZMenu,
    IZAplState,
    IZEvento,
    IZCampo,
    CM
} from '../../zcommon/contracts';
import { Constants as ZCommonConstants } from "../../zcommon";
import { Constants as ZPantexConstants } from "../../zpantex";

export namespace ZcmpResponder {

    let querySelector: any;
    let zFormaTablaForm: HTMLFormElement;
    let zFormInput: any;
    let zCampoList: Array<IZCampo> = [];

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommonConstants.ComandoEnum.CM_SINCCAMPO:
                const dato = zEvento.dato.buffer.dato as CM.ISincCampo;

                querySelector = `#${ZPantexConstants.PX_PREFIJO_ID}${getState().zPantexModule.pxAlTope.toString()}${ZPantexConstants.ZFT_PREFIJO_ID}0`;

                if (!zFormaTablaForm) {
                    zCampoList = getState().zPantexModule.pilaPantex[0].zFormaTablaList[0].cmps;
                    zFormaTablaForm = document.querySelector(querySelector) as HTMLFormElement;
                }

                zFormInput = zFormaTablaForm.elements.namedItem(dato.nc);

                if (zFormInput == null) {
                    break;
                }

                zCampoList.find((zCampo: IZCampo) => {

                    if (zCampo.nomCmp) {
                        setFieldTextValue(zCampo, dato);
                    }
                   
                    return null;
                });

                break;
        }
    }

    const setFieldTextValue = (campoState: IZCampo, dato: CM.ISincCampo) => {
        if (campoState.nomCmp == dato.nc) {
            if (campoState.claseInd == ZCommonConstants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
                zFormInput.value = dato.vc;
            }
        }
    }
}