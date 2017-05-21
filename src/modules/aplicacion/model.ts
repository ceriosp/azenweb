import {
    ZMenuModel
} from "../zmenu";

import {
    ZRecursoModel,
    ZRecursoViewModel
} from "../recursos";

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