import * as ZCommon from '../../zcommon';
import {IZPantex, IZMenu,  IZAplState,  IZEvento} from '../../zcommon/contracts';
import * as ZPantex from '../../zpantex';

export namespace ZftResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {

            case ZCommon.Constants.ComandoEnum.CM_PXCREAR:
                const zPantex = zEvento.dato.buffer.dato as IZPantex;
                dispatch(ZPantex.Actions.ZPantexModule.ponerAlTope(zPantex));
                break;

        }
    }

}