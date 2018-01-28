import {

    //Models
    ZMenuModel,
    ZRecursoViewModel,

    //Utils
} from './models';
import { EntityNormalizedObj } from './contracts';

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