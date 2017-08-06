import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import * as ZCommon from '../../zcommon';
import {

    //Models
    ZRecursoViewModel,

    //State
    ZAplicationState,

    //Utils
    EntityNormalizedObj,

} from "../../zcommon";

import * as ZRecursos from "../../zpantex";

import * as ZAplicacion from '../index';

import ZAreaTrabajo from '../components/ZAreaTrabajo';

interface OwnProps {

}

interface ConnectedState {
    recursosActivosViewModelList: Array<ZRecursoViewModel>;
}
const mapStateToProps = (state:ZCommon.State) : ConnectedState => ({
    recursosActivosViewModelList:ZRecursos.Selectors.getRecursosActivosViewModelList(state.zaplicationState)
});

export const ZAreaTrabajoContainer: React.ComponentClass<OwnProps> = 
connect<ConnectedState, undefined, OwnProps>(mapStateToProps)(ZAreaTrabajo);