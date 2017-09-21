import * as ZCommon from '../../zcommon';
import { IZMenu, IZAplState, IZEvento } from '../../zcommon/contracts';

export namespace ZcmpResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommon.Constants.ComandoEnum.CM_SINCCAMPO:
                const dato = zEvento.dato.buffer.dato as string;
                break;

        }
    }
}    