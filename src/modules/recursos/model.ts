class ZRecurso
{
    ven: ZVentana;
    camps: Array<ZCampo>;
    doms: Array<ZDominio>;
    refs: Array<ZReferencia>;
}

class ZVentana
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

class ZCampo
{
    etq: string;
    filEtq: number;
    colEtq: number;
    nomCam: string;
    filCam: number;
    colCam: number;
    lonv: number;
    posbit: number;
    claseInd: number;
    tipo: number;
    lon: number;
    noEnTabla: number;
    modo: number;
    numDec: number; 
}

class ZDominio
{
    nom: string;
    minimo: string;
    maximo: string;
    defecto: string;
    plantilla: string;
    siRequerido: number;
    siMemoriza: number;
}

class ZReferencia
{
    public nomTblFor: string;
    public alias: string;
    public nomRcrZoom: string;
    public debil: number;

    public junt:Array<ZJuntura>;
    public descs: Array<ZDescripcionReferencia>;    
}

class ZDescripcionReferencia
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

class ZJuntura
{
    public nomCmp: string;
}

export 
{ 
    ZRecurso,
    ZVentana,
    ZCampo,
    ZDominio,
    ZReferencia,
    ZJuntura,
    ZDescripcionReferencia
}