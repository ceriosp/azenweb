import * as ZCommon from '../zcommon';
import {
    IZColaEventos, IZAplState, IZEvento, IZMenu, IZPantex, IZLoginModule, IZAplList, IZCampo, CM, IZCampoState, IZComandoFormaState, ContractsServices
} from '../zcommon';

import * as ZMenu from '../zmenu';
import * as ZPantex from '../zpantex';
import * as ZLogin from '../zlogin';
import { Constants as ZCommonConstants } from "../zcommon";
import { Constants as ZPantexConstants } from "../zpantex";

let xml2js = require('xml2js');

export namespace Services {

    export namespace Responder {

        //#region Public methods

        //valores de los campos de un px: <nombreCampo, valor>         
        let hashZCampoState = new Map<string, IZCampoState>();
        let listaPxCampos: Array<number>; //Lista px para actualizar campos
        let iIrACmpParametros: CM.IAdicionar;

        let cmSincCampoParametros: CM.ISincCampo;
        let cmPrenderControlParametros: CM.IPrenderControl;
        let cmPrenderModoParametros: CM.IPrenderModo;

        let listaPxComandos: Array<number>; //Lista px para actualizar comandos
        let hashZComandoState = new Map<ZCommonConstants.ComandoEnum, IZComandoFormaState>();
        let cmSincBotonParametros: CM.ISincBoton;

        //Sirve para adicionar, modificar, consultar...
        let cmCambiarTituloVentana: CM.ICambiarTituloVentana = undefined;

        let numFilasVisiblesMulti: number;
        let numFilasVisiblesMultiZft: number; //Nro. del zft para cambiar num filas visibles multi

        export const procesarZColaEventos = (zColaEventos: IZColaEventos, dispatch: (p: any) => any, getState: () => IZAplState) => {

            //valores de los campos de un px: <nombreCampo, valor> 
            hashZCampoState = new Map<string, IZCampoState>();
            listaPxCampos = [];
            iIrACmpParametros = undefined;

            hashZComandoState = new Map<ZCommonConstants.ComandoEnum, IZComandoFormaState>();
            listaPxComandos = [];

            cmCambiarTituloVentana = undefined;

            numFilasVisiblesMulti = 0;
            numFilasVisiblesMultiZft = -1;

            for (let i = 0; i < zColaEventos.eventos.length; i++) {

                parseEventoDataToJSON(zColaEventos.eventos[i]);
                
                const evento = zColaEventos.eventos[i];
                switch (evento.dato.cmd) {

                    //Comandos sincronizar px
                    case ZCommonConstants.ComandoEnum.CM_SINCCAMPO:
                        cmSincCampo(evento);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_IRACMP:
                        cmIrACmp(evento);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_PRENDERCONTROL:
                        cmPrenderControl(evento, evento.dato.cmd);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_APAGARCONTROL:
                        cmApagarControl(evento, evento.dato.cmd);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_PRENDERMODO:
                        cmPrenderModo(evento, evento.dato.cmd);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_APAGARMODO:
                        cmApagarModo(evento, evento.dato.cmd);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_SINCBOTON:
                        cmSincBoton(evento);
                        break;

                    case ZCommonConstants.ComandoEnum.CM_MODIFICAR:
                    case ZCommonConstants.ComandoEnum.CM_ACTUALIZAR:
                    case ZCommonConstants.ComandoEnum.CM_CONSULTAR:
                        cmCambiarTituloVentana = evento.dato.buffer.dato as CM.ICambiarTituloVentana;
                        break;

                    case ZCommonConstants.ComandoEnum.CM_PXVISUALIZARRPT:
                        const visualRtpParams = evento.dato.buffer.dato as CM.IPxVisualizarRpt;
                        window.open(trimLasCharacter(getState().azenURL, "/") + "/azenweb" + visualRtpParams.vc, "", "location=0");
                        break;

                    case ZCommonConstants.ComandoEnum.CM_LIMPIARMULTI:
                        numFilasVisiblesMulti = parseInt(((evento.dato.buffer.dato) as CM.ILimpiarMulti).vc);
                        numFilasVisiblesMultiZft = ((evento.dato.buffer.dato) as CM.ILimpiarMulti).rg;
                        break;

                    //Comandos zft
                    case ZCommon.Constants.ComandoEnum.CM_PXCREAR:
                    case ZCommon.Constants.ComandoEnum.CM_PXCREARMENSAJE:
                    case ZCommon.Constants.ComandoEnum.CM_PXCREARZOOM:
                    case ZCommon.Constants.ComandoEnum.CM_PXCREARMOV:
                        const zPantex = evento.dato.buffer.dato as IZPantex;
                        dispatch(ZPantex.Actions.ZPantexStateModule.pxCrear(zPantex, evento.dato.cmd));
                        break;

                    case ZCommon.Constants.ComandoEnum.CM_PXARRIVAR:

                        const pxArrivarBuffer = evento.dato.buffer.dato as CM.IPxArrivar;

                        const pxArrivarParams = {
                            px: pxArrivarBuffer.px
                        } as CM.IPxArrivar;

                        dispatch(ZPantex.Actions.ZPantexStateModule.cmPxArrivar(pxArrivarParams));

                        break;

                    case ZCommon.Constants.ComandoEnum.CM_PONERMODAL:
                        const ponerModal = evento.dato.buffer.dato as CM.IPonerModal;

                        if (ponerModal.px == getState().zPantexStateModule.pxAlTope) {
                            dispatch(ZPantex.Actions.ZPantexStateModule.ponerModal(true));
                        }
                        break;

                    case ZCommon.Constants.ComandoEnum.CM_QUITARMODAL:
                        const quitarModal = evento.dato.buffer.dato as CM.IQuitarModal;

                        if (quitarModal.px == getState().zPantexStateModule.pxAlTope) {
                            dispatch(ZPantex.Actions.ZPantexStateModule.ponerModal(false));
                        }
                        break;

                    case ZCommon.Constants.ComandoEnum.CM_PXDESTRUIR:
                        const pxDestruir = evento.dato.buffer.dato as CM.IPxDestruir;
                        dispatch(ZPantex.Actions.ZPantexStateModule.cmPxDestruir(pxDestruir));
                        break;

                    //Comandos menu
                    case ZCommon.Constants.ComandoEnum.CM_DEFMENU:
                        const zmenu = evento.dato.buffer.dato as IZMenu;
                        dispatch(ZMenu.Actions.ZMenuModule.setZMenu(zmenu));
                        break;

                    //Comandos aplicación
                    case ZCommon.Constants.ComandoEnum.CM_APLICACION:
                        const zAplList = evento.dato.buffer.dato as IZAplList;
                        dispatch(ZLogin.Actions.ZLoginModule.setZAplList(zAplList));
                        break;
                }
            }

            console.log("module/zaplicacion/services- lista px a refrescar: " + JSON.stringify(listaPxCampos));
            console.log(hashZCampoState);

            console.log("module/zaplicacion/services- comandos px/hash:  " + JSON.stringify(listaPxComandos));
            console.log(hashZComandoState);

            //Hay campos para sincronizar      
            if (hashZCampoState.size > 0 || hashZComandoState.size > 1 || numFilasVisiblesMulti > 0) {
                dispatch(ZPantex.Actions.ZPantexStateModule.cmSincPx(
                    listaPxCampos,
                    hashZCampoState,
                    listaPxComandos,
                    hashZComandoState,
                    cmCambiarTituloVentana,
                    numFilasVisiblesMulti,
                    numFilasVisiblesMultiZft,
                    getState().ultimoComandoEnviado));
            } else {
                if (cmCambiarTituloVentana) {
                    dispatch(ZPantex.Actions.ZPantexStateModule.setTituloVentana(cmCambiarTituloVentana));
                }
            }
        }

        const trimLasCharacter = (s: string, c: string) => {
            if (c === "]") c = "\\]";
            if (c === "\\") c = "\\\\";
            return s.replace(new RegExp(
                "^[" + c + "]+|[" + c + "]+$", "g"
            ), "");
        }

        const cmSincCampo = (infoEvento: IZEvento) => {
            cmSincCampoParametros = infoEvento.dato.buffer.dato as CM.ISincCampo;
            let hashKey = ContractsServices.getSincHashKey(cmSincCampoParametros);

            cmSincCampoParametros.px = parseInt(cmSincCampoParametros.px.toString());
            if (listaPxCampos.indexOf(cmSincCampoParametros.px) == -1) {
                listaPxCampos.push(cmSincCampoParametros.px);
            }

            cmSincCampoParametros.fi = cmSincCampoParametros.fi
                ? parseInt(cmSincCampoParametros.fi.toString())
                : cmSincCampoParametros.fi;

            if (!hashZCampoState.has(hashKey)) {
                let zCampoEnHash = {
                    px: cmSincCampoParametros.px,
                    value: cmSincCampoParametros.vc,
                    rg: cmSincCampoParametros.rg,
                    fi: cmSincCampoParametros.fi
                } as IZCampoState;

                //Es radio o checkbox
                if (cmSincCampoParametros.pb) {
                    zCampoEnHash.posBitsOn = [];
                    if (cmSincCampoParametros.vc == "X" || cmSincCampoParametros.vc == "*") {
                        zCampoEnHash.value = undefined;
                        zCampoEnHash.posBitsOn.push(parseInt(cmSincCampoParametros.pb.toString()));
                    }
                }

                hashZCampoState.set(hashKey, zCampoEnHash);

            } else {
                const zCampoEnHash = hashZCampoState.get(hashKey);
                zCampoEnHash.value = cmSincCampoParametros.vc;
                zCampoEnHash.value = cmSincCampoParametros.vc,
                    zCampoEnHash.rg = cmSincCampoParametros.rg,
                    zCampoEnHash.fi = cmSincCampoParametros.fi

                //Es radio o checkbox
                if (cmSincCampoParametros.pb) {
                    if (!zCampoEnHash.posBitsOn) {
                        zCampoEnHash.posBitsOn = [];
                    }
                    if (cmSincCampoParametros.vc == "X" || cmSincCampoParametros.vc == "*") {
                        zCampoEnHash.value = undefined;
                        zCampoEnHash.posBitsOn.push(parseInt(cmSincCampoParametros.pb.toString()));
                    }
                }
            }
        }

        const cmIrACmp = (infoEvento: IZEvento) => {
            iIrACmpParametros = infoEvento.dato.buffer.dato as CM.ISincCampo;
            let hashKey = ContractsServices.getSincHashKey(cmSincCampoParametros);

            if (!hashZCampoState.has(hashKey)) {
                let zCampoEnHash = {
                    autoFocus: true
                } as IZCampoState;

                hashZCampoState.set(hashKey, zCampoEnHash);

            } else {
                const zCampoEnHash = hashZCampoState.get(hashKey);
                zCampoEnHash.autoFocus = true;
            }
        }

        const cmPrenderControl = (infoEvento: IZEvento, cmd: ZCommonConstants.ComandoEnum) => {
            cmPrenderControlParametros = infoEvento.dato.buffer.dato as CM.IPrenderControl;
            let hashKey = ContractsServices.getSincHashKey(cmPrenderControlParametros);
            if (!hashZCampoState.has(hashKey)) {
                hashZCampoState.set(hashKey, {
                    bitPrenderControl: Math.log2(cmPrenderControlParametros.mc)
                } as IZCampoState);
            } else {
                hashZCampoState.get(hashKey).bitPrenderControl = Math.log2(cmPrenderControlParametros.mc);
            }
        }

        const cmApagarControl = (infoEvento: IZEvento, cmd: ZCommonConstants.ComandoEnum) => {
            cmPrenderControlParametros = infoEvento.dato.buffer.dato as CM.IPrenderControl;
            let hashKey = ContractsServices.getSincHashKey(cmPrenderControlParametros);
            if (!hashZCampoState.has(hashKey)) {
                hashZCampoState.set(hashKey, {
                    bitApagarControl: Math.log2(cmPrenderControlParametros.mc)
                } as IZCampoState);
            } else {
                hashZCampoState.get(hashKey).bitApagarControl = Math.log2(cmPrenderControlParametros.mc);
            }
        }

        const cmPrenderModo = (infoEvento: IZEvento, cmd: ZCommonConstants.ComandoEnum) => {
            cmPrenderModoParametros = infoEvento.dato.buffer.dato as CM.IPrenderModo;
            let hashKey = ContractsServices.getSincHashKey(cmPrenderModoParametros);
            if (!hashZCampoState.has(hashKey)) {
                hashZCampoState.set(hashKey, {
                    bitPrenderModo: Math.log2(cmPrenderModoParametros.mc)
                } as IZCampoState);
            } else {
                hashZCampoState.get(hashKey).bitPrenderModo = Math.log2(cmPrenderModoParametros.mc);
            }
        }

        const cmApagarModo = (infoEvento: IZEvento, cmd: ZCommonConstants.ComandoEnum) => {
            cmPrenderModoParametros = infoEvento.dato.buffer.dato as CM.IPrenderModo;
            let hashKey = ContractsServices.getSincHashKey(cmPrenderModoParametros);
            if (!hashZCampoState.has(hashKey)) {
                hashZCampoState.set(hashKey, {
                    bitApagarModo: Math.log2(cmPrenderModoParametros.mc)
                } as IZCampoState);
            } else {
                hashZCampoState.get(hashKey).bitApagarModo = Math.log2(cmPrenderModoParametros.mc);
            }
        }

        const cmSincBoton = (infoEvento: IZEvento) => {
            cmSincBotonParametros = infoEvento.dato.buffer.dato as CM.ISincBoton;
            cmSincBotonParametros.px = parseInt(cmSincBotonParametros.px.toString());
            cmSincBotonParametros.nc = parseInt(cmSincBotonParametros.nc.toString());
            if (listaPxComandos.indexOf(cmSincBotonParametros.px) == -1) {
                listaPxComandos.push(cmSincBotonParametros.px);
            }
            if (!hashZComandoState.has(cmSincBotonParametros.nc)) {
                let zComandFormaEnHash = {
                    desh: parseInt(cmSincBotonParametros.vc.toString())
                } as IZComandoFormaState;

                hashZComandoState.set(cmSincBotonParametros.nc, zComandFormaEnHash);

            } else {
                const zComandFormaEnHash = hashZComandoState.get(cmSincBotonParametros.nc);
                zComandFormaEnHash.desh = parseInt(cmSincBotonParametros.vc.toString())
            }
        }
        //#endregion

        //#region Private methods

        /**
         * @param zEvento evento azen
         * https://www.npmjs.com/package/xml2js#processing-attribute-tag-names-and-values
         */
        const parseEventoDataToJSON = (zEvento: IZEvento) => {
            if (zEvento.dato.buffer.fto == ZCommon.Constants.FormatoDatoEventoEnum.XML) {

                let eventDataResult = (`<r>${zEvento.dato.buffer.dato}</r>`);

                let parsingOptions = {
                    trim: true, //Trim the whitespace at the beginning and end of text nodes.
                    normalizeTags: true, //Normalize all tag names to lowercase.
                    normalize: false, //Trim whitespaces inside text nodes.
                    explicitArray: false //Always put child nodes in an array if true; otherwise an array is created only if there is more than one
                }

                xml2js.parseString(eventDataResult, parsingOptions, (err: any, result: any) => {
                    zEvento.dato.buffer.dato = result.r;
                });
            }
        }

        //#endregion

    }
}