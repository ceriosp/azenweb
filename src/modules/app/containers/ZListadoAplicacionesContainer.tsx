import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZListadoAplicaciones,
} from '../components/ZListadoAplicaciones';

import { IZAppState } from "../../zcommon";
import {
    Actions as ZComunicacionesActions
} from '../../zcomunicaciones';

const mapStateToProps = (appState: IZAppState): ConnectedState => ({
    
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    lanzarAplicacion: (identificadorAplicacion: string) => 
        dispatch(ZComunicacionesActions.lanzarAplicacion(identificadorAplicacion))
});

export const ZListadoAplicacionesContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZListadoAplicaciones);