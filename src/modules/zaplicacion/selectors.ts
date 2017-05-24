import { createSelector } from 'reselect';

import {
    ZMenuModel,
    ZMenuItemModel
} from "../zmenu";

import {
    ZRecursoViewModel
} from "../zrecursos";

import {     
    ZAplicationState,    
} from './model';

namespace Selectors
{

    export const zmenuModelSelector = (zaplicationState:ZAplicationState):ZMenuModel => zaplicationState.zmenuModel;

    export const mapRecursosIndxByIdSelector = (zaplicationState:ZAplicationState):Map<string, ZRecursoViewModel> => zaplicationState.mapRecursosIndxById;

    export const recursosIdListSelector = createSelector(
        [mapRecursosIndxByIdSelector],
        (mapRecursosIndxByCtx:Map<string, ZRecursoViewModel>) => {

            let recursosCtxList = new Array<string>();

            let keysIterable: IterableIterator<string> = mapRecursosIndxByCtx.keys();      
            for (let i = 0; i < mapRecursosIndxByCtx.size; i++) {
                recursosCtxList.push(keysIterable.next().value);
            }    

            return recursosCtxList;
        }
    );
}


export {
    Selectors
}



