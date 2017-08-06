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
    export const getRecursosViewModel = (zaplicationState:ZAplicationState):EntityNormalizedObj<ZRecursoViewModel> => zaplicationState.recursosViewModel;    

    export const getRecursosActivosViewModelList = createSelector(
        [getRecursosViewModel],
        (recursosViewModelById:EntityNormalizedObj<ZRecursoViewModel>):Array<ZRecursoViewModel> => {            

            console.log("recalculates selector");

            let recursosActivos = new Array<ZRecursoViewModel>();

            if(!recursosViewModelById){
                return recursosActivos;
            }

            if(!recursosViewModelById.allIds){
                return recursosActivos;
            }

            let currentId:string;
            for(let i=0; i<recursosViewModelById.allIds.length; i++){
                currentId = recursosViewModelById.allIds[i];
                recursosActivos.push(recursosViewModelById.byId[currentId]);
            }

            return recursosActivos;    
        }
    );
}


