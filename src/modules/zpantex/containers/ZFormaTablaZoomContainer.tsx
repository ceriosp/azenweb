import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState, IZFormaTablaState, IZCampoState } from "../../zcommon/contracts";

import {
    Actions
} from '../actions';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZFormaTablaZoom
} from '../components/ZFormaTablaZoom';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({

});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    onFilaMultiSeleccionada: (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) =>
        dispatch(Actions.ZPantexStateModule.onFilaMultiSeleccionada(zFormaTablaState, indexFilaMultiSeleccionada)),

    onCampoFocusIrACmp: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.onCampoFocusIrACmp(zcampoState)),

});

export const ZFormaTablaZoomContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZFormaTablaZoom);