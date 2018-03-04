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
    ZCampoTextoBasico
} from '../components/ZCampoTextoBasico';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor: appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    onCampoFocusIrACmp: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.onCampoFocusIrACmp(zcampoState)),

    onCampoBlur: (zcampoState: IZCampoState) =>
        dispatch(Actions.ZPantexStateModule.onCampoBlur(zcampoState)),

    onCampoChanged: (zcampoState: IZCampoState, valor: string) =>
        dispatch(Actions.ZPantexStateModule.onCampoChanged(zcampoState, valor)),
});

export const ZCampoTextoBasicoContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoTextoBasico);