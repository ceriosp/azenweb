import { createSelector } from 'reselect';

import { State } from './model';

const getMapRecursosIndxByCtx = (state:State) => state.zaplicationState.mapRecursosIndxByCtx;

export {
    getMapRecursosIndxByCtx
}



