import { Constants } from "./constants";

export interface IZAplState
{
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
    cmd:Constants.CodigoComandoEnum;
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
    cmd:Constants.CodigoComandoEnum;
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
