import {

    //Models
    ZMenuModel,
    ZRecursoViewModel,

    //Utils
    EntityNormalizedObj
} from './models';

class ZMenuState
{
    zmenuModel: ZMenuModel;
}

interface State
{    
    zmenuState:ZMenuState;
    zaplicationState:ZAplicationState;
}

interface ZAplicationState
{
    mostrandoVentanaModal:boolean;
    recursosViewModel: EntityNormalizedObj<ZRecursoViewModel>;
    recursosZoomViewModel: EntityNormalizedObj<ZRecursoViewModel>;
}

export{
    ZMenuState,
    State,
    ZAplicationState
}