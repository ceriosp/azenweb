import * as ZCommon from '../../zcommon';
import {IZMenu, IZAplState,  IZEvento} from '../../zcommon/contracts';
import * as ZMenu from '../../zmenu';

export namespace ZmenuResponder {

    export const responder = (zEvento: IZEvento, dispatch: (p: any) => any, getState: () => IZAplState) => {

        switch (zEvento.dato.cmd) {
            case ZCommon.Constants.ComandoEnum.CM_DEFMENU:
                const zmenu = zEvento.dato.buffer.dato as IZMenu;
                dispatch(ZMenu.Actions.ZMenuModule.setZMenu(zmenu));
                break;
        }
    }

}