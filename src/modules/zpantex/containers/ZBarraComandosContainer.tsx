import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import * as ZCommon from "../../zcommon";
import { IZAplState, IZComandoFormaState } from "../../zcommon/contracts";

import * as ZAplicacion from "../../zaplicacion";

import {
    OwnProperties,
    ConnectedState,
    ConnectedDispatch,
    ZBarraComandos
} from '../components/ZBarraComandos';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    despacharComandoLineaEstado: (zcomandoFormaState: IZComandoFormaState) =>
        dispatch(ZAplicacion.Actions.despacharComandoLineaEstado(zcomandoFormaState))
});

export const ZBarraComandosContainer: React.ComponentClass<OwnProperties> =
    connect<ConnectedState, ConnectedDispatch, OwnProperties>(mapStateToProps, mapDispatchToProps)(ZBarraComandos);