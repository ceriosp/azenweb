import {
    Constants
} from './constants';

class ZMenuState
{
    zmenuModel: ZMenuModel;
}

interface State
{    
    zmenuState:ZMenuState;
    zaplicationState:ZAplicationState;
}

interface ZAplicationState
{
    mostrandoVentanaModal:boolean;
    mapRecursosIndxById: Map<string, ZRecursoViewModel>;
    mapRecursosZoomIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIds:Array<string>;
}

class ZRecursoModel
{
    ven: ZVentanaModel;
    camps: Array<ZCampoModel>;
    doms: Array<ZDominioModel>;
    refs: Array<ZReferenciaModel>;
}

class ZRecursoViewModel extends ZRecursoModel
{
    ctx:string;
    px:number;
    visible:boolean;
    tipoRecurso:Constants.TipoRecurso;
    mapZoomsIdsIndxByCampo:Map<string, ZReferenciaViewModel>;
}

class ZVentanaModel
{   
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

class ZCampoModel
{
    etq: string;
    filEtq: number;
    colEtq: number;
    nomCmp: string;
    filCmp: number;
    colCmp: number;
    lonv: number;
    posbit: number;
    claseInd: number;
    tipo: number;
    lon: number;
    noEnTabla: number;
    modo: number;
    numDec: number; 
}

class ZDominioModel
{
    nom: string;
    minimo: string;
    maximo: string;
    defecto: string;
    plantilla: string;
    siRequerido: number;
    siMemoriza: number;
}

class ZReferenciaModel
{
    public nomTblFor: string;
    public alias: string;
    public nomRcrZoom: string;
    public debil: number;

    public junt:Array<ZJunturaModel>;
    public descs: Array<ZDescripcionReferenciaModel>;    
}

class ZReferenciaViewModel extends ZReferenciaModel
{
    public nomCmp:string;
}

class ZDescripcionReferenciaModel
{
    etq: string;
    filEtq: number;
    colEtq: number;
    nomCamFor: string;
    filCmp: number;
    colCmp: number;
    lonv: number;
    modo: number;
}

class ZJunturaModel
{
    public nomCmp: string;
}


class ZMenuModel
{
    constructor(){
        this.menu = new Array<ZMenuItemModel>();
    }

    menu: Array<ZMenuItemModel>;
}

class ZMenuItemModel
{
    nom: string;
    desc: string;
    ctx: string;
    desh: number;
    menu: Array<ZMenuItemModel>;
}

export 
{ 
    //State
    State,
    ZAplicationState,
    ZMenuState,

    //Recursos
    ZRecursoModel,
    ZRecursoViewModel,
    ZVentanaModel,
    ZCampoModel,
    ZDominioModel,
    ZReferenciaModel,
    ZReferenciaViewModel,
    ZJunturaModel,
    ZDescripcionReferenciaModel,

    //Menu
    ZMenuModel,
    ZMenuItemModel,
}
