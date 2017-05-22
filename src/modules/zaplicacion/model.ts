import {
    ZMenuModel
} from "../zmenu";

import {
    ZRecursoModel,
    ZRecursoViewModel
} from "../zrecursos";

interface State
{    
    zaplicationState:ZAplicationState
}

interface ZAplicationState
{
    zmenuModel:ZMenuModel;    
    mapRecursosIndxByCtx: Map<string, ZRecursoViewModel>;
    recursosActivosIds:Array<string>;
}

export
{
    State,
    ZAplicationState
}