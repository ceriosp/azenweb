import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import { IZAplState } from "../../zcommon/contracts";

import {
    OwnProps,
    ConnectedState,
    ConnectedDispatch,
    ZLogin
} from '../components/ZLogin';

import { Actions } from '../actions'

const mapStateToProps = (appState: IZAplState): ConnectedState => ({
    zLogin: appState.zLoginModule
});

const mapDispatchToProps = (dispatch: redux.Dispatch<any>): ConnectedDispatch => ({
    login: () =>
        dispatch(Actions.ZLoginModule.login()),

    usernameChanged: (username: string) =>
        dispatch(Actions.ZLoginModule.setUsername(username)),

    passwordChanged: (password: string) =>
        dispatch(Actions.ZLoginModule.setPassword(password))
});

export const ZLoginContainer: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZLogin);