import * as React from 'react';
import * as redux from 'redux';
import {Action} from 'redux';
import { connect } from 'react-redux';


import
{
    //Models
    ZMenuModel,
    ZMenuItemModel,    

    //Components
    ZMenuRoot    

} from "../../zmenu";

import ZAreaTrabajo from './ZAreaTrabajo';

import * as ZRecursos from '../../zrecursos/';
import {
    ZRecursoModel,
    ZRecursoViewModel
} from "../../zrecursos";

import * as ZAplication from '../index';


interface OwnProps {

}

interface ConnectedState {
    zmenuModel:ZMenuModel;
    mapRecursosActivos: Map<string, ZRecursoViewModel>;
    recursosActivosCtxList:Array<string>
}
const mapStateToProps = (state:ZAplication.State, ownProps:OwnProps) : ConnectedState => ({
    zmenuModel:state.zaplicationState.zmenuModel,
    mapRecursosActivos:state.zaplicationState.mapRecursosIndxByCtx,
    recursosActivosCtxList:ZAplication.selectors.recursosCtxListSelector(state.zaplicationState)
});

interface ConnectedDispatch
{
    desparcharRecurso: (zmenuItemModel: ZMenuItemModel) => void;
    cerrarRecurso:(zrecursoViewModel: ZRecursoViewModel) => void    
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZAplication.ZAplicationState>): ConnectedDispatch => ({
  desparcharRecurso:(zmenuItemModel: ZMenuItemModel) => dispatch(ZAplication.Actions.desparcharRecurso(zmenuItemModel)),
  cerrarRecurso:(zrecursoViewModel: ZRecursoViewModel) => dispatch(ZAplication.Actions.cerrarRecurso(zrecursoViewModel)),
});


class ZAplicacionRoot extends React.Component<ConnectedDispatch & ConnectedState & OwnProps, undefined>
{    
    constructor(props: ConnectedDispatch & ConnectedState & OwnProps) {
        super(props);

        this.mostrarRecurso = this.mostrarRecurso.bind(this);
        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
    }

    render() {

        return (
            <div className="container">

                <ZMenuRoot 
                    zmenuModel={this.props.zmenuModel}
                    index={0}
                    despacharOpcionMenuFn={this.mostrarRecurso} />

                <ZAreaTrabajo 
                    mapRecursosActivos={this.props.mapRecursosActivos}
                    recursosActivosCtxList={this.props.recursosActivosCtxList}
                    cerrarVentanaRecursoFn={this.cerrarVentanaRecurso} />

            </div>
        );
    }


    mostrarRecurso(zmenuItemModel: ZMenuItemModel) {
        this.props.desparcharRecurso(zmenuItemModel);
    }

    cerrarVentanaRecurso(zRecursoViewModel:ZRecursoViewModel) {
        this.props.cerrarRecurso(zRecursoViewModel);
    }
}

const ZAplicacionRootComponent: React.ComponentClass<OwnProps> = 
connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacionRoot);

export 
{
    ZAplicacionRootComponent
}

