import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";
import { Constants as ZCommonConstants } from "../../zcommon/constants";
import { Actions as ZAplicacionActions } from "../../zaplicacion/actions";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZCampoCheckbox
} from '../components/ZCampoCheckbox';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    sincronizarCampo: (buffer: string) =>
        dispatch(ZAplicacionActions.despacharEventoCliente(ZCommonConstants.ComandoEnum.CM_CAMBIOCMPIND, buffer))
});

export const ZCampoCheckboxContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoCheckbox);