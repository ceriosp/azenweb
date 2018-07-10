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
    ZCampoArchivo
} from '../components/ZCampoArchivo';

import { Actions } from "../actions";

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    parametrosActivacionObj: appState.parametrosActivacionObj,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    enviarCmdCambioCmp: (zcampoState: IZCampoState, valor: string) =>
        dispatch(Actions.ZPantexStateModule.enviarCmdCambioCmp(zcampoState, valor)),
});

export const ZCampoArchivoContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZCampoArchivo);