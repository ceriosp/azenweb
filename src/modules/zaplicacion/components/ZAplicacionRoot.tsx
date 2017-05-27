import * as React from 'react';
import * as redux from 'redux';
import {Action} from 'redux';
import { connect } from 'react-redux';

import * as ZCommon from '../../zcommon';
import {
    ZRecursoModel,
    ZRecursoViewModel,
    ZReferenciaViewModel,

    ZAplicationState
} from "../../zcommon";

import
{
    //Components
    ZMenuRoot    

} from "../../zmenu";

import ZAreaTrabajo from './ZAreaTrabajo';

import * as ZAplicacion from '../index';

interface OwnProps {

}

interface ConnectedState {
    mostrandoVentanaModal:boolean;
    mapRecursosActivosIndxById: Map<string, ZRecursoViewModel>;
    mapRecursosZoomActivosIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIdList:Array<string>
}
const mapStateToProps = (state:ZCommon.State, ownProps:OwnProps) : ConnectedState => ({
    mapRecursosActivosIndxById:ZAplicacion.Selectors.mapRecursosIndxByIdSelector(state.zaplicationState),
    mapRecursosZoomActivosIndxById:ZAplicacion.Selectors.mapRecursosZoomIndxByIdSelector(state.zaplicationState),
    recursosActivosIdList:ZAplicacion.Selectors.recursosIdListSelector(state.zaplicationState),
    mostrandoVentanaModal:state.zaplicationState.mostrandoVentanaModal
});

interface ConnectedDispatch
{
    cerrarVentanaRecurso:(zrecursoViewModel: ZRecursoViewModel) => void;
    abrirVentanaZoom: (zreferenciaViewModel: ZReferenciaViewModel) => void;
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZAplicationState>): ConnectedDispatch => ({ 
  cerrarVentanaRecurso:(zrecursoViewModel: ZRecursoViewModel) => dispatch(ZAplicacion.Actions.cerrarVentanaRecurso(zrecursoViewModel)),
  abrirVentanaZoom:(zreferenciaViewModel: ZReferenciaViewModel) => dispatch(ZAplicacion.Actions.abrirVentanaZoom(zreferenciaViewModel)),
});


class ZAplicacionRootComponent extends React.Component<ConnectedDispatch & ConnectedState & OwnProps, undefined>
{    
    constructor(props: ConnectedDispatch & ConnectedState & OwnProps) {
        super(props);

        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {

        return (
            <div className="container">

                <ZMenuRoot 
                    index={0}
                    solaparse={!this.props.mostrandoVentanaModal}/>

                <ZAreaTrabajo 
                    mapRecursosActivosIndxById={this.props.mapRecursosActivosIndxById}
                    mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}
                    recursosActivosIdList={this.props.recursosActivosIdList}
                    cerrarVentanaRecursoFn={this.cerrarVentanaRecurso}
                    onCampoZoomClick={this.onCampoZoomClick} />

            </div>
        );
    }

    cerrarVentanaRecurso(zRecursoViewModel:ZRecursoViewModel) {
        this.props.cerrarVentanaRecurso(zRecursoViewModel);
    }

    onCampoZoomClick(zreferenciaViewModel: ZReferenciaViewModel){        
        this.props.abrirVentanaZoom(zreferenciaViewModel);
    }
}

const ZAplicacionRoot: React.ComponentClass<OwnProps> = 
connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacionRootComponent);

export
{
    ZAplicacionRoot
}

