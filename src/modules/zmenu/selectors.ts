import {
    ZMenuModel,
    ZMenuItemModel,

    ZMenuState,
    
} from '../zcommon';


export namespace Selectors
{
    export const zmenuModelSelector = (zmenuState:ZMenuState):ZMenuModel => zmenuState.zmenuModel; 
}