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
    ZMenuRootComponent    

} from "../../zmenu";

import ZAreaTrabajo from './ZAreaTrabajo';

import * as ZAplicacion from '../index';

interface OwnProps {

}

interface ConnectedState {
    mapRecursosActivosIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIdList:Array<string>
}
const mapStateToProps = (state:ZCommon.State, ownProps:OwnProps) : ConnectedState => ({
    mapRecursosActivosIndxById:ZAplicacion.Selectors.mapRecursosIndxByIdSelector(state.zaplicationState),
    recursosActivosIdList:ZAplicacion.Selectors.recursosIdListSelector(state.zaplicationState)
});

interface ConnectedDispatch
{
    cerrarVentanaRecurso:(zrecursoViewModel: ZRecursoViewModel) => void    
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZAplicationState>): ConnectedDispatch => ({ 
  cerrarVentanaRecurso:(zrecursoViewModel: ZRecursoViewModel) => dispatch(ZAplicacion.Actions.cerrarVentanaRecurso(zrecursoViewModel)),
});


class ZAplicacionRoot extends React.Component<ConnectedDispatch & ConnectedState & OwnProps, undefined>
{    
    constructor(props: ConnectedDispatch & ConnectedState & OwnProps) {
        super(props);

        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {

        return (
            <div className="container">

                <ZMenuRootComponent index={0}/>

                <ZAreaTrabajo 
                    mapRecursosActivosIndxById={this.props.mapRecursosActivosIndxById}
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
        console.log("en aplicacion root");
        console.log(zreferenciaViewModel);
    }
}

const ZAplicacionRootComponent: React.ComponentClass<OwnProps> = 
connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacionRoot);

export
{
    ZAplicacionRootComponent
}

