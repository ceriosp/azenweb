import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";
import { Actions } from "../actions";
import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    LanzarVisorReporte,
} from '../components/LanzarVisorReporte';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    mostrarReporte: appState.zrptModule.mostrarReporte,
    rutaReporte: appState.zrptModule.rutaReporte
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    cerrarVisorReporte: () =>
        dispatch(Actions.ZrptModule.cerrarVisorReporte())
});

export const LanzarVisorReporteContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(LanzarVisorReporte);