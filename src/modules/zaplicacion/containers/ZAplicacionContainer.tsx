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
    ZAplicacion,
} from '../components/ZAplicacion';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    zPantexModule:appState.zPantexModule
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    
});

export const ZAplicacionContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacion);