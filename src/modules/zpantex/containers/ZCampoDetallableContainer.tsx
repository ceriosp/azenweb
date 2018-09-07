import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState, IZCampoState } from "../../zcommon/contracts";
import { Constants as ZCommonConstants } from "../../zcommon/constants";
import { Actions as ZAplicacionActions } from "../../zaplicacion/actions";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoDetallable
} from '../components/ZCampoDetallable';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    cmDetallar: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.cmDetallar(zcampoState))
});

export const ZCampoDetallableContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoDetallable);