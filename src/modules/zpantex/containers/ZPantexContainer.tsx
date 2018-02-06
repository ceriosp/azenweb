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
    ZPantex,
} from '../components/ZPantex';

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    pxAlTope: appState.zPantexStateModule.pxAlTope,
    ultimoComandoEnviado: appState.ultimoComandoEnviado
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({

});

export const ZPantexContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZPantex);