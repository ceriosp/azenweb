import { Constants } from "./constants";
import { ResultadoAction } from "../zutils/models";
import { ZIconoBoton } from "./index";


//#region =============================================== UTILS ===============================================

class EntityNormalizedObj<TEntity>{

    constructor() {
        this.byId = {};
        this.allIds = Array<string>();
    }

    byId: EntityMap<TEntity>;
    allIds: Array<string>
}

interface EntityMap<TEntity> {
    [id: string]: TEntity;
}
//#endregion

//#region =============================================== DOMAIN ===============================================
export interface IZBuffer {
    fto: string;
    dato: string | IZMenu | IZPantex | IZAplList | CM.ISincCampo;
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

export interface IZRegion {
    zFormaTabla: IZFormaTabla;
}

export interface IZFormaTabla { //zft
    ven: IZVentana;

    linEst: Array<IZComandoForma>;
    btns: Array<IZComandoForma>;
    cmps: Array<IZCampo>;
}

export interface IZLineaEstado {
    linEst: Array<IZComandoForma>;
}

/**
 * ZEitem
 */
export interface IZComandoForma {
    etq: string;
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
     * Responde a zcommon.Constants.ComandoEnum.CM_SINCCAMPO - 119
     * Sincroniza el dato del campo entre lógica y presentación
     * Responder: zcmpResponder
     * Estado: por implementar
     */
    export interface ISincCampo {
        /**
         * Identificador de la ventana (px)
         */
        px: number;

        /**
         * Nombre del campo (nomCmp)
         */
        nc: string;

        /**
         * Valor del campo.
         * Para los campos radio:
         *  <vc> </vc>:apagado
         *  <vc>*</vc>:prendido
         * Para los campos check:
         *  <vc> </vc>:apagado
         *  <vc>X</vc>:prendido
         * 
         */
        vc: string;

        /**
         * Posición del bit, cuando es radio o chequeo.
         * Para los campos radio: el número (pb) indica el campo radio, pues todos los campos radio 
         *      tienen el mismo nomCmp. 
         * Para los campos check, el número (pb) indica el bit que identifica el check, que se prende o apaga.
         *  
         */
        pb: number;

        /**
         * número de la región 
         */
        rg: number;

    }


    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_PXARRIVAR - 122
     * Pone la ventana (px) al frente
     * Estado: por implementar
     */
    export interface IPxArrivar {

        /**
         * Número de la ventana a poner al frente.
         */
        px: number;


    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_ADICIONAR - 44
     * Pone título a la ventana
     * Estado: implementado
     */
    export interface IAdicionar {
        /**
         * Número de la ventana a cambiar título
         */ 
        px: number;

        /**
         * Título a poner a la ventana
         */
        vc: string;
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_MODIFICAR - 45
     * Pone título a la ventana
     * Estado: implementado
     */
    export interface IModificar {
        /**
         * Número de la ventana a cambiar título
         */
        px: number;

        /**
         * Título a poner a la ventana
         */
        vc: string;
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_CONSULTAR - 61
     * Pone título a la ventana
     * Estado: implementado
     */
    export interface IConsultar {
        /**
         * Número de la ventana a cambiar título
         */
        px: number;

        /**
         * Título a poner a la ventana
         */
        vc: string;
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_ARRIVARCMP - 77
     * Pone el foco en el campo (campo actual)
     * Estado: Por implementar 
     */
    export interface IArrivarCmp {
        /**
         * Numero de la ventana
         */
        px: number;

        /**
         * Número de la región
         */
        rg: number;

        /**
         * Nombre del campo (nomCmp) a poner el foco.
         */
        nc: string;
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_PRENDERMODO - 51
     * Estado: Por implementar 
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
     * Responde a zcommon.Constants.ComandoEnum.CM_PRENDERCONTROL - 96
     *  Prende bit control del campo, según zcommon.Constants.ControlCampo
     * Estado: por implementar
     */
    export interface IPrenderControl {
        /**
         * Número de la ventana que contiene el campo
         */
        px: number,

        /**
         * Nombre del campo al cual es le  prende control
         */
        nc: string,

        /**
         * Número de la región que contiene el campo
         */
        rg: number,

        /**
         * Modo control a poner (manejo bitwise)
         * mc es el valor decimal del bit a prender (ej: 32 corresponde a bit 6)
         */
        mc: number
    }

    /**
     * Responde a zcommon.Constants.ComandoEnum.CM_PXDESTRUIR - 121
     */
    export interface IPxDestruir {
        /**
         * 
         */
        px: number
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
//#endregion

//#region =========================================== CUSTOM DOMAIN ===========================================

interface IZCamposRegion {
    rg: number;
    camposMap: EntityNormalizedObj<IZCampo>
}

interface IZPantexNormalized {
    px: number;
    zPantex: IZPantex;
    zftMap: EntityNormalizedObj<IZCamposRegion>
}

//#endregion

//#region =============================================== STATE ===============================================

export interface IZAplState {
    idApl: string;
    nomApl: string;
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
    iconosBotonesList: Array<ZIconoBoton>;
    pantexMap: EntityNormalizedObj<IZPantexNormalized>;
}

export interface IZLoginModule {
    username: string;
    password: string;
    zAplList: IZAplList;
    resultadoAction: ResultadoAction;
}
//#endregion
