import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    Actions as ZComunicacionesActions
} from '../../zcomunicaciones';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZListadoAplicaciones,
} from '../components/ZListadoAplicaciones';

import * as ZAplicacion from '../../zaplicacion';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    zLoginModule: appState.zLoginModule    
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    lanzarAplicacion: (identificadorAplicacion: string) => 
        dispatch(ZAplicacion.Actions.lanzarAplicacion(identificadorAplicacion))
});

export const ZListadoAplicacionesContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZListadoAplicaciones);