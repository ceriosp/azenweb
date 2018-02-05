import {

    //Models
    ZMenuModel,    

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
}

export{
    ZMenuState,
    State,
    ZAplicationState
}