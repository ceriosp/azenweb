import {
    Constants
} from './constants';

export interface IBuffer {
    fto:string;
    dato:string;
}

export interface IDatoEvento {
    tipo:Constants.TipoEventoEnum;
    tec:number; //tecla
    cmd:Constants.CodigoComandoEnum;
    inf:string;
    buffer:IBuffer;
}

export interface IEvento {
    evento:number;
    dato:IDatoEvento;
}

export interface IColaEventos {
    numEventos:number;
    eventos:Array<IEvento>;
}