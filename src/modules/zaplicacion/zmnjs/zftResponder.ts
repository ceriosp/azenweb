import * as ZCommon from '../../zcommon';
import * as ZPantex from '../../zpantex';
import { IZPantex, IZMenu, IZAplState, IZEvento, CM } from '../../zcommon/contracts';
import { Constants as ZPantexConstants } from "../../zpantex/constants";

export namespace ZftResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommon.Constants.ComandoEnum.CM_PXCREAR:
                const zPantex = zEvento.dato.buffer.dato as IZPantex;
                dispatch(ZPantex.Actions.ZPantexModule.ponerAlTope(zPantex));
                break;

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

            case ZCommon.Constants.ComandoEnum.CM_CERRAR:
                console.log("CM_CERRAR");
                console.log(zEvento.dato.buffer.dato);
                break;
        }
    }

    export const changeZPantexTitle = (px: number, vc: string) => {
        let pxTitleHeader = document.querySelector('#' + ZPantexConstants.PX_PREFIJO_TITLE_ID + px);
        pxTitleHeader.textContent = vc;
    }

    export const setZFormaTablaState = (setReadOnly: boolean, px: number, dispatch: (p: any) => any, getState: () => IZAplState) => {
        let zFormaTablaCount = getState().zPantexModule.pilaPantex[0].zFormaTablaList.length;
        let form: any;
        let arrayInput: any;

        for (let i = 0; i < zFormaTablaCount; i++) {
            form = document.querySelector('#' + ZPantexConstants.PX_PREFIJO_ID + px + ZPantexConstants.ZFT_PREFIJO_ID + i);

            arrayInput = form.querySelectorAll('input');

            arrayInput.forEach((input: any) => {
                input.disabled = setReadOnly;
            });
        }
    }

}