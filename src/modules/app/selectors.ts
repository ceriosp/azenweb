import {
    //State
    IZAplState,
} from "../zcommon";

export namespace Selectors {

    export const getIdApl = (zAplState: IZAplState): string => zAplState.idApl;
}