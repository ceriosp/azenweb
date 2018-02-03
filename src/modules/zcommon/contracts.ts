import { Constants } from "./constants";
import { ResultadoAction } from "../zutils/models";
import { ZIconoBoton } from "./index";


//#region =============================================== UTILS ===============================================

export class IdEntityBase {
    id: number;
}

export interface IEntityNormalizeObj {
    byId: any;
    allIds: Array<number>
}

export class EntityNormalizedObj<TEntity>{

    constructor() {
        this.byId = {};
        this.allIds = [];
    }

    byId: EntityMap<TEntity>;
    allIds: Array<number>
}

export class EntityMap<TEntity>{
    [id: number]: TEntity;
}

//#endregion

//#region =============================================== DOMAIN ===============================================
export interface IZBuffer {
    fto: string;
    dato: string | IZMenu | IZPantex | IZAplList | CM.ISincCampo | CM.IPrenderControl | CM.ISincBoton;
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
    tipoAJAXIndicador: Constants.TipoAJAXIndicadorEnum;
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

/**
 * ZEitem
 */
export interface IZComandoForma {
    etq: string;
    tec: number;
    cmd: Constants.ComandoEnum;
    desh: number; //1:deshabilitado, 0:habilitado
}

export interface IZVentanaBase {
    numPx: number;
    descr: string;
    nomTbl: string;
    nomRcrZoom: string;
    numLinsDatos: number; //Si es multi > 1
}

export interface IZVentana extends IZVentanaBase {

    nfils: number;
    ncols: number;
    fil: number;
    col: number;
    modo: number;
    cmdsBtn: number;
    cmdsLE: number;
    numLinsEnc: number;

    ctx: number;
    nfilsrx: number;
    ncolsrx: number;
}

export interface IZCampoBase {
    nomCmp: string;
    etq: string;
    claseInd: Constants.ClaseIndicadorEnum;
    lon: number;
    lonv: number;
    control: number;
    modo: number; //Constants.ModoCampo namespace
    posbit: number;
}

export interface IZCampo extends IZCampoBase {
    lonv: number;
    tipo: number;
    noEnTabla: number;
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

//#region =============================================== Own state ===============================================
export interface IZPantexState extends IdEntityBase {
    id: number; //px
    zFormaTablaStateListIds: Array<number>;

    //Propiedades del state
    zFormaTablaListState: Array<IZFormaTablaState>;
}

export class ZPantexState implements IZPantexState {

    constructor(numPx: number) {
        this.id = numPx;
        this.zFormaTablaStateListIds = new Array<number>();
    }

    id: number; //px
    zFormaTablaStateListIds: Array<number>;
    zFormaTablaListState: Array<IZFormaTablaState>;
}

export interface IZFormaTablaState extends IdEntityBase { //zft
    id: number;
    idZVentana: number;
    zCampoStateListIds: Array<number>;
    linEstListIds: Array<number>;
    btnsListIds: Array<number>;

    venState: IZVentanaState;
    cmpsState: Array<IZCampoState>;
    linEstState: Array<IZComandoFormaState>;
    btnsState: Array<IZComandoFormaState>;
}

export class ZFormaTablaState implements IZFormaTablaState { //zft

    constructor(id: number) {
        this.id = id;
        this.zCampoStateListIds = new Array<number>();
        this.linEstListIds = new Array<number>();
        this.btnsListIds = new Array<number>();
    }

    id: number;
    idZVentana: number;

    //Propiedades IZFormaTablaState
    zCampoStateListIds: Array<number>;
    linEstListIds: Array<number>;
    btnsListIds: Array<number>;

    //GUI calculated properties
    venState: IZVentanaState;
    cmpsState: Array<IZCampoState>;
    linEstState: Array<IZComandoFormaState>;
    btnsState: Array<IZComandoFormaState>;
}

export interface IZCampoState extends IdEntityBase, IZCampoBase {

    id: number;
    px: number;
    value: any;
    readOnly: boolean;
    esCampoGrafico: boolean;
    haCambiado: boolean;
    checked: boolean;

    esDetallable:boolean;

    //Para valores de campos radio/chequeo: Contiene los valores de los que están en On
    posBitsOn: Array<number>;

    //Para campos dentro de un campo gráfico
    parentId?: number;
    cmpsState: Array<IZCampoState>;

    //Propiedades para sincronizar valores
    bitPrenderControl: number;
    bitApagarControl: number;
    bitPrenderModo: number;
    bitApagarModo: number;    
}

export class ZCampoState implements IZCampoState {

    constructor(zcampo: IZCampo, id: number, px: number) {

        this.id = id;
        this.px = px;
        this.haCambiado = false;

        this.nomCmp = zcampo.nomCmp;
        this.etq = zcampo.etq;
        this.claseInd = zcampo.claseInd;
        this.lon = zcampo.lon;
        this.lonv = zcampo.lonv;
        this.posbit = zcampo.posbit;

        this.control = zcampo.control;
        this.modo = zcampo.modo;
        this.readOnly = ContractsServices.esCampoControlLectura(zcampo.control) || ContractsServices.esCampoModoLectura(zcampo.modo);

        this.esDetallable = ContractsServices.Binario.estaPrendidoBit(zcampo.modo, Constants.ModoCampoEnum.ZCMP_MDETALLABLE);

        this.value = "";
        this.checked = false;

        this.esCampoGrafico = zcampo.cmps != undefined && zcampo.cmps.length > 1;
    }

    //Propiedades para manejo de estado
    id: number;
    px: number;
    value: string;
    readOnly: boolean;
    esCampoGrafico: boolean;
    haCambiado: boolean;
    parentId?: number; //Para campos dentro de un campo gráfico
    cmpsState: Array<IZCampoState>;

    //Para valores de campos radio/chequeo: Contiene los valores de los que están en On
    posBitsOn: Array<number>;

    checked: boolean;
    esDetallable:boolean;

    //Propiedades IZCampo
    nomCmp: string;
    etq: string;
    claseInd: Constants.ClaseIndicadorEnum;
    lon: number;
    lonv: number;
    posbit: number;
    control: number;
    modo: number;

    //Propiedades para sincronizar valores
    bitPrenderControl: number;
    bitApagarControl: number;
    bitPrenderModo: number;
    bitApagarModo: number;    
}

export interface IZComandoFormaState extends IZComandoForma {
    id: number;
    px: number;
}

export class ZComandoFormaState implements IZComandoFormaState {

    constructor(zComandoForma: IZComandoForma, id: number, px: number) {

        this.id = id;
        this.px = px;

        if (!zComandoForma) {
            return;
        }

        this.etq = zComandoForma.etq;
        this.tec = zComandoForma.tec;
        this.cmd = zComandoForma.cmd;
        this.desh = zComandoForma.desh;
    }

    id: number;
    px: number;

    //Propiedades de IZComandoFormaState
    etq: string;
    tec: number;
    cmd: Constants.ComandoEnum;
    desh: number; //1:deshabilitado, 0:habilitado    
}

export interface IZVentanaState extends IZVentanaBase {
    id: number;
}

export class ZVentanaState implements IZVentanaState {

    constructor(zVentana: IZVentana, id: number) {

        this.id = id;

        this.numPx = zVentana.numPx;
        this.descr = zVentana.descr;
        this.nomTbl = zVentana.nomTbl;
        this.nomRcrZoom = zVentana.nomRcrZoom;
        this.numLinsDatos = zVentana.numLinsDatos;
    }

    id: number;

    //Propiedades IZVentanaBase
    numPx: number;
    descr: string;
    nomTbl: string;
    nomRcrZoom: string;
    numLinsDatos: number; //Si es multi > 1    
}


//#endregion

//#region =============================================== Comandos ===============================================
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
     * Responde a zcommon.Constants.ComandoEnum.CM_PXVISUALIZARRPT - 123
     */
    export interface IPxVisualizarRpt {
        /**
         * 
         */
        vc: string
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
        nc: Constants.ComandoEnum,

        /**
         * 
         */
        vc: number
    }

    /**
     *  Responde a zcommon.Constants.ComandoEnum.CM_PONERMODAL - 169
     */
    export interface IPonerModal {
        /**
         * 
         */
        px: number
    }

    /**
     *  Responde a zcommon.Constants.ComandoEnum.CM_QUITARMODAL - 170
     */
    export interface IQuitarModal {
        /**
         * 
         */
        px: number
    }
}
//#endregion

//#region =============================================== STATE ===============================================

export interface IZAplState {
    idApl: string;
    nomApl: string;
    azenURL: string;
    estaProcesandoRequestServidor: boolean;
    ultimoComandoEnviado: Constants.ComandoEnum;
    tipoAJAXIndicador: Constants.TipoAJAXIndicadorEnum;
    zMenuModule: IZMenuModule;
    zPantexModule: IZPantexModule;
    zPantexStateModule: IZPantexStateModule;
    zLoginModule: IZLoginModule;
    zrptModule: IZrptModule;
}

export interface IZMenuModule {
    visible: boolean;
    zmenu: IZMenu;
}

export interface IZPantexModule {

    pilaPantex: Array<IZPantex>;

    azenURL: string;

    pxAlTope: number;
    iconosBotonesList: Array<ZIconoBoton>;
}

export interface IZPantexStateModule {

    pilaPx: Array<number>;
    pxAlTope: number;
    ponerModal: boolean;

    pilaPantexState: EntityNormalizedObj<IZPantexState>;
    zFormaTablaState: EntityNormalizedObj<IZFormaTablaState>;
    zCampoState: EntityNormalizedObj<IZCampoState>;
    zComandoFormaState: EntityNormalizedObj<IZComandoFormaState>;
    zVentanaState: EntityNormalizedObj<IZVentanaState>;
}

export interface IZLoginModule {
    username: string;
    password: string;
    zAplList: IZAplList;
    resultadoAction: ResultadoAction;
}

export interface IZrptModule {
    mostrarReporte: boolean;
    rutaReporte: string;
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


export namespace ContractsServices {

    export const esCampoModoLectura = (modo: number): boolean => {
        return modo
            && (Binario.estaPrendidoBit(modo, Constants.ModoCampoEnum.ZCMP_MNOARRIVABLE)
                ||
                Binario.estaPrendidoBit(modo, Constants.ModoCampoEnum.ZCMP_MSOLOVISUAL)
            )
    }

    export const esCampoControlLectura = (control:number) => {
        return control && Binario.estaPrendidoBit(control, Constants.ControlCampoEnum.ZCMP_VISUAL);
    }

    export namespace Binario {
        export const estaPrendidoBit = (num: number, bit: number) => {
            return ((num >> bit) % 2 != 0);
        }

        export const prenderBit = (num: number, bit: number) => {
            return num | 1 << bit;
        }

        export const apagarBit = (num: number, bit: number) => {
            return num & ~(1 << bit);
        }
    }
}