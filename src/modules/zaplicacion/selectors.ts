import { createSelector } from 'reselect';

import {
    ZMenuItemModel
} from "../zmenu";

import {
    ZRecursoViewModel
} from "../zrecursos";

import {     
    ZAplicationState,    
} from './model';

namespace selectors
{
    export const mapRecursosIndxByCtxSelector = (zaplicationState:ZAplicationState):Map<string, ZRecursoViewModel> => zaplicationState.mapRecursosIndxByCtx;


    export const recursosCtxListSelector = createSelector(
        [mapRecursosIndxByCtxSelector],
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
    selectors
}



