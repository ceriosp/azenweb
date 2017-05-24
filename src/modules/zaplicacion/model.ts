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
    mapRecursosIndxById: Map<string, ZRecursoViewModel>;
    mapRecursosZoomIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIds:Array<string>;
}

export
{
    State,
    ZAplicationState
}