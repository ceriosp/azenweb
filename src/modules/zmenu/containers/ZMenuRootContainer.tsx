import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    Actions as ZComunicacionesActions
} from '../../zcomunicaciones';

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZMenuRoot,
} from '../components/ZMenuRoot';

import * as ZAplicacion from '../../zaplicacion';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    zMenu:appState.zMenuModule.zmenu,
    nomApl: appState.nomApl,
    exPxModal: appState.zPantexModule.esPxModal,

    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor,
    tipoAJAXIndicador:appState.tipoAJAXIndicador,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    despacharOpcionMenu: (zmenuItemModel: any) => null
});

export const ZMenuRootContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZMenuRoot);