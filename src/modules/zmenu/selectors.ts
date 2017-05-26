import {
    ZMenuModel,
    ZMenuItemModel,

    ZMenuState,
    
} from '../zcommon';


export namespace selectors
{
    export const zmenuModelSelector = (zmenuState:ZMenuState):ZMenuModel => zmenuState.zmenuModel; 
}