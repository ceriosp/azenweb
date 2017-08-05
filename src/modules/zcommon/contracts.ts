import { Constants } from "./constants";

export interface IZAplState
{   
    estaProcesandoRequestServidor:boolean;     
    zMenuModule:IZMenuModule;
}

export interface IZMenuModule {
    visible:boolean;
    zmenu:IZMenu;
}

export interface IZBuffer {
    fto:string;
    dato:string | IZMenu;
}

export interface IZDatoEvento {

    tipo:Constants.TipoEventoEnum;
    tec:number; //tecla
    cmd:Constants.ComandoEnum;
    inf:string;
    buffer:IZBuffer;    
}

export interface IZEvento {
    evento:number;
    dato:IZDatoEvento;
}

export interface IZColaEventos {
    numEventos:number;
    eventos:Array<IZEvento>;
}

export interface IZEnviarComandoParams {
    cmd:Constants.ComandoEnum;
    buffer:string;
    idApl:string;
}

export interface IZMenu
{
    menu: Array<IZMenuItem>;
}

export interface IZMenuItem
{
    nom: string;
    desc: string;
    ctx: string;
    desh: number;
    menu: Array<IZMenuItem>;
}

export interface IZCampo
{
    etq: string;
    nomCmp: string;
    filEtq: number;
    colEtq: number;    
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

