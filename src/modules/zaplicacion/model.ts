import {
    ZMenuModel
} from "../zmenu";

import {
    ZRecursoModel,
    ZRecursoViewModel
} from "../zrecursos";

interface ZAplicacionState
{
    zmenuModel:ZMenuModel;

    mapRecursosIndxByCtx: Map<string, ZRecursoViewModel>;
    recursosActivosIds:Array<string>;
}

export
{
    ZAplicacionState
}