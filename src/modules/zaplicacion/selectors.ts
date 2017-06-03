import { createSelector } from 'reselect';

import {

    //Models
    ZRecursoViewModel,

    //State
    ZAplicationState,

    //Utils
    EntityNormalizedObj

} from "../zcommon";

export namespace Selectors
{    
    export const getRecursosViewModelById = (zaplicationState:ZAplicationState):EntityNormalizedObj<ZRecursoViewModel> => zaplicationState.recursosViewModel;
    export const getRecursosZoomViewModelById = (zaplicationState:ZAplicationState):EntityNormalizedObj<ZRecursoViewModel> => zaplicationState.recursosZoomViewModel;

    export const recursosIdListSelector = createSelector(
        [getRecursosViewModelById, getRecursosZoomViewModelById],
        (mapRecursosIndxByCtx:EntityNormalizedObj<ZRecursoViewModel>,
        mapRecursosZoomIndxByCtx:EntityNormalizedObj<ZRecursoViewModel>) => {

            /*
            let recursosIdsList = new Array<string>();

            let keysIterable: IterableIterator<string> = mapRecursosIndxByCtx.keys();      
            for (let i = 0; i < mapRecursosIndxByCtx.size; i++) {
                recursosIdsList.push(keysIterable.next().value);
            }    

            keysIterable = mapRecursosZoomIndxByCtx.keys();      
            for (let i = 0; i < mapRecursosZoomIndxByCtx.size; i++) {
                recursosIdsList.push(keysIterable.next().value);
            }

            return recursosIdsList;
            */
        }
    );
}


