import {
    //State
    IZAplState,
} from "../zcommon";

export namespace Selectors {

    export const getIdApl = (zAplState: IZAplState): string => zAplState.idApl;

    export const getNomApl = (zAplState: IZAplState): string => zAplState.nomApl;
}