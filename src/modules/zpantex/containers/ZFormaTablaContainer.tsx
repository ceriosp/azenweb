import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState, IZFormaTablaState } from "../../zcommon/contracts";

import {
    Actions
} from '../actions';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZFormaTabla
} from '../components/ZFormaTabla';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({

});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    onSaltarMov: (zFormaTablaState: IZFormaTablaState, regionDestino: number) =>
        dispatch(Actions.ZPantexStateModule.onSaltarMov(zFormaTablaState, regionDestino))
});

export const ZFormaTablaContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZFormaTabla);