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
import { Actions } from '../../zlogin';

import {Actions as AppActions} from '../../app/actions';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    zMenu:appState.zMenuModule.zmenu,
    nomApl: appState.nomApl,
    username: appState.zLoginModule.username,

    parametrosActivacion: appState.parametrosActivacion,

    ponerModal: appState.zPantexStateModule.ponerModal,

    estaProcesandoRequestServidor:appState.estaProcesandoRequestServidor,
    tipoAJAXIndicador:appState.tipoAJAXIndicador,
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    despacharOpcionMenu: (zmenuItemModel: any) => null,
    activarLogConsola: (nivelLog:number) => dispatch(AppActions.setNivelLog(nivelLog)),
});

export const ZMenuRootContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZMenuRoot);