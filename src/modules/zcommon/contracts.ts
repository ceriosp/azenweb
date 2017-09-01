import { Constants } from "./constants";
import { ResultadoAction } from "../zutils/models";

export interface IZAplState {
    idApl: string;
    estaProcesandoRequestServidor: boolean;
    zMenuModule: IZMenuModule;
    zPantexModule: IZPantexModule;
    zLoginModule: IZLoginModule;
}

export interface IZMenuModule {
    visible: boolean;
    zmenu: IZMenu;
}

export interface IZPantexModule {
    pxAlTope: number;
    pilaPantex: Array<IZPantex>;
}

export interface IZLoginModule {
    username: string;
    password: string;
    zAplList: IZAplList;
    resultadoAction: ResultadoAction;
}

export interface IZBuffer {
    fto: string;
    dato: string | IZMenu | IZPantex | IZAplList;
}

export interface IZDatoEvento {

    tipo: Constants.TipoEventoEnum;
    tec: number; //tecla
    cmd: Constants.ComandoEnum;
    inf: string;
    buffer: IZBuffer;
}

export interface IZEvento {
    evento: number;
    dato: IZDatoEvento;
}

export interface IZColaEventos {
    numEventos: number;
    eventos: Array<IZEvento>;
}

export interface IZEnviarComandoParams {
    cmd: Constants.ComandoEnum;
    buffer: string;
}

export interface IZMenu {
    menu: Array<IZMenuItem>;
}

export interface IZMenuItem {
    nom: string;
    desc: string;
    ctx: string;
    desh: number;
    menu: Array<IZMenuItem>;
}

export interface IZPantex {
    numPx: number;
    zFormaTablaList: Array<IZFormaTabla>;
}

export interface IZFormaTabla { //zft
    ven: IZVentana;
    linEst: Array<IZComandoForma>;
    cmps: Array<IZCampo>;
    btns: Array<IZComandoForma>;
}

/**
 * ZEitem
 */
export interface IZComandoForma {
    tex: string;
    tec: number;
    cmd: Constants.ComandoEnum;
    desh: number; //1:deshabilitado, 0:habilitado
}

export interface IZVentana {
    numPx: number;
    descr: string;
    nomTbl: string;
    nomRcrZoom: string;
    nfils: number;
    ncols: number;
    fil: number;
    col: number;
    modo: number;
    cmdsBtn: number;
    cmdsLE: number;
    numLinsEnc: number;
    numLinsDatos: number;
    ctx: number;
    nfilsrx: number;
    ncolsrx: number;
}

export interface IZCampo {
    nomCmp: string;
    etq: string;
    lonv: number;
    posbit: number;
    claseInd: Constants.ClaseIndicadorEnum;
    tipo: number;
    lon: number;
    noEnTabla: number;
    modo: number; //Constants.ModoCampo namespace
    numDec: number;
    cmps?: Array<IZCampo>;
}

export interface IZAplList {
    apls: Array<IZApl>;
}

export interface IZApl {
    apl: string;
    descr: string;
}

/**
 * Namespace de comandos, 
 * see: zcommon.Constants.ComandoEnum
 */
export namespace CM {

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_PRENDERMODO - 51
     */
    export interface IPrenderModo {
        /**
         * 
         */
        px: number;

        /**
         * 
         */
        nc: string;

        /**
         * 
         */
        rg: number;

        /**
         * 
         */
        mc: number;
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_CONSULTAR - 61
     */
    export interface IConsultar {
        /**
         * 
         */
        px: number,

        /**
         * 
         */
        vc: string
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_PRENDERCONTROL - 96
     */
    export interface IPrenderControl {
        /**
         * 
         */
        px: number,

        /**
         * 
         */
        nc: string,

        /**
         * 
         */
        rg: number,

        /**
         * 
         */
        mc: number
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_SINCCAMPO - 119 
     */
    export interface ISinCampo {
        /**
         * 
         */
        px: number,

        /**
         * 
         */
        nc: string,

        /**
         * 
         */
        vc: string,

        /**
         * 
         */
        pb: number,

        /**
         * 
         */
        rg: number
    }

    /**
     *  Responde a zcommon.Constants.ComandoEnum.CM_PXARRIVAR - 122
     */
    export interface IPxArrivar {
        /**
         * 
         */
        px: number
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_SINCBOTON - 140
     */
    export interface ISincBoton {
        /**
         * 
         */
        px: number,

        /**
         * 
         */
        nc: number,

        /**
         * 
         */
        vc: number
    }

}