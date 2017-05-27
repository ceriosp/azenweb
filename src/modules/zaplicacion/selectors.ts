import { createSelector } from 'reselect';

import {
    ZRecursoViewModel,

    ZAplicationState,
} from "../zcommon";

export namespace Selectors
{    
    export const mapRecursosIndxByIdSelector = (zaplicationState:ZAplicationState):Map<string, ZRecursoViewModel> => zaplicationState.mapRecursosIndxById;
    export const mapRecursosZoomIndxByIdSelector = (zaplicationState:ZAplicationState):Map<string, ZRecursoViewModel> => zaplicationState.mapRecursosZoomIndxById;

    export const recursosIdListSelector = createSelector(
        [mapRecursosIndxByIdSelector, mapRecursosZoomIndxByIdSelector],
        (mapRecursosIndxByCtx:Map<string, ZRecursoViewModel>,
        mapRecursosZoomIndxByCtx:Map<string, ZRecursoViewModel>) => {

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
        }
    );
}


