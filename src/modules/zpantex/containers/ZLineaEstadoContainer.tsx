import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import * as ZCommon from "../../zcommon";
import { IZAplState } from "../../zcommon/contracts";

import * as ZAplicacion from "../../zaplicacion";

import {
    OwnProperties,
    ConnectedState,
    ConnectedDispatch,
    ZLineaEstado
} from '../components/ZLineaEstado';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor: appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    despacharEventoCliente: (cmd: ZCommon.Constants.ComandoEnum) =>
        dispatch(ZAplicacion.Actions.despacharEventoCliente(cmd))
});

export const ZLineaEstadoContainer: React.ComponentClass<OwnProperties> =
    connect<ConnectedState, ConnectedDispatch, OwnProperties>(mapStateToProps, mapDispatchToProps)(ZLineaEstado);