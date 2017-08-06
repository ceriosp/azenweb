import * as React from 'react';
import * as redux from 'redux';
import { Action } from 'redux';
import { connect } from 'react-redux';

import * as ZCommon from '../../zcommon';
import {

    //Models
    ZRecursoModel,
    ZRecursoViewModel,
    ZReferenciaViewModel,

    //State
    ZAplicationState,

    //Utils
    EntityNormalizedObj,

} from "../../zcommon";

import {
    //Components
    ZMenuRoot

} from "../../zmenu";

import { ZAreaTrabajoContainer } from '../containers/ZAreaTrabajoContainer';

import * as ZMenu from "../../zmenu";
import * as ZRecursos from "../../zpantex";
import * as ZAplicacion from '../index';

interface OwnProps {

}

interface ConnectedState {
    mostrandoVentanaModal: boolean;
    recursosViewModelById: EntityNormalizedObj<ZRecursoViewModel>;
    recursosZoomViewModelById: EntityNormalizedObj<ZRecursoViewModel>;
}
const mapStateToProps = (state: ZCommon.State, ownProps: OwnProps): ConnectedState => ({
    recursosViewModelById: ZAplicacion.Selectors.getRecursosViewModelById(state.zaplicationState),
    recursosZoomViewModelById: ZAplicacion.Selectors.getRecursosZoomViewModelById(state.zaplicationState),
    mostrandoVentanaModal: state.zaplicationState.mostrandoVentanaModal
});

interface ConnectedDispatch {
    cargarMenu: (appName: string) => void;
    cerrarVentanaRecurso: (zrecursoViewModel: ZRecursoViewModel) => void;
    abrirVentanaZoom: (zreferenciaViewModel: ZReferenciaViewModel) => void;
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZAplicationState>): ConnectedDispatch => ({
    cargarMenu:(appName:string) => dispatch(ZMenu.Actions.cargarMenu(appName)),
    cerrarVentanaRecurso: (zrecursoViewModel: ZRecursoViewModel) => dispatch(ZRecursos.Actions.cerrarVentanaRecurso(zrecursoViewModel)),
    abrirVentanaZoom: (zreferenciaViewModel: ZReferenciaViewModel) => dispatch(ZRecursos.Actions.abrirVentanaZoom(zreferenciaViewModel)),
});


class ZAplicacionRootComponent extends React.Component<ConnectedDispatch & ConnectedState & OwnProps, undefined>
{
    constructor(props: ConnectedDispatch & ConnectedState & OwnProps) {
        super(props);

        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    componentWillMount(){        
        this.props.cargarMenu("azenctb");
    }

    componentDidMount(){
        //this.props.cargarMenu("azenctb");
    }

    render() {

        return (
            <div className="container">
                <ZAreaTrabajoContainer />
            </div>
        );
    }

    cerrarVentanaRecurso(zRecursoViewModel: ZRecursoViewModel) {
        this.props.cerrarVentanaRecurso(zRecursoViewModel);
    }

    onCampoZoomClick(zreferenciaViewModel: ZReferenciaViewModel) {
        this.props.abrirVentanaZoom(zreferenciaViewModel);
    }
}

const ZAplicacionRoot: React.ComponentClass<OwnProps> =
    connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacionRootComponent);

export {
    ZAplicacionRoot
}

