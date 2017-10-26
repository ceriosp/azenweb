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
    ZBarraComandos
} from '../components/ZBarraComandos';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({

});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    despacharEventoCliente: (cmd: ZCommon.Constants.ComandoEnum) =>
        dispatch(ZAplicacion.Actions.despacharEventoCliente(cmd))
});

export const ZBarraComandosContainer: React.ComponentClass<OwnProperties> =
    connect<ConnectedState, ConnectedDispatch, OwnProperties>(mapStateToProps, mapDispatchToProps)(ZBarraComandos);