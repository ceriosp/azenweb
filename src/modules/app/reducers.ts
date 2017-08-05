import { Reducer, combineReducers } from 'redux';
import { IZAplState } from "../zcommon/contracts";

import * as ZMenu from '../zmenu'; 

export namespace Reducers {
    export const zaplState : Reducer<IZAplState> = combineReducers<IZAplState>({
        zMenuModule: ZMenu.Reducers.ZMenuModule.impl as any
    });
}