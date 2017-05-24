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

import * as ZAplicacion from '../index';

interface OwnProps {

}

interface ConnectedState {
    zmenuModel:ZMenuModel;
    mapRecursosActivosIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIdList:Array<string>
}
const mapStateToProps = (state:ZAplicacion.State, ownProps:OwnProps) : ConnectedState => ({
    zmenuModel:ZAplicacion.Selectors.zmenuModelSelector(state.zaplicationState),
    mapRecursosActivosIndxById:ZAplicacion.Selectors.mapRecursosIndxByIdSelector(state.zaplicationState),
    recursosActivosIdList:ZAplicacion.Selectors.recursosIdListSelector(state.zaplicationState)
});

interface ConnectedDispatch
{
    despacharOpcionMenu: (zmenuItemModel: ZMenuItemModel) => void;
    cerrarVentanaRecurso:(zrecursoViewModel: ZRecursoViewModel) => void    
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZAplicacion.ZAplicationState>): ConnectedDispatch => ({
  despacharOpcionMenu:(zmenuItemModel: ZMenuItemModel) => dispatch(ZAplicacion.Actions.despacharOpcionMenu(zmenuItemModel)),
  cerrarVentanaRecurso:(zrecursoViewModel: ZRecursoViewModel) => dispatch(ZAplicacion.Actions.cerrarVentanaRecurso(zrecursoViewModel)),
});


class ZAplicacionRoot extends React.Component<ConnectedDispatch & ConnectedState & OwnProps, undefined>
{    
    constructor(props: ConnectedDispatch & ConnectedState & OwnProps) {
        super(props);

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {

        return (
            <div className="container">

                <ZMenuRoot 
                    zmenuModel={this.props.zmenuModel}
                    index={0}
                    despacharOpcionMenuFn={this.despacharOpcionMenu} />

                <ZAreaTrabajo 
                    mapRecursosActivosIndxById={this.props.mapRecursosActivosIndxById}
                    recursosActivosIdList={this.props.recursosActivosIdList}
                    cerrarVentanaRecursoFn={this.cerrarVentanaRecurso}
                    onCampoZoomClick={this.onCampoZoomClick} />

            </div>
        );
    }


    despacharOpcionMenu(zmenuItemModel: ZMenuItemModel) {
        this.props.despacharOpcionMenu(zmenuItemModel);
    }

    cerrarVentanaRecurso(zRecursoViewModel:ZRecursoViewModel) {
        this.props.cerrarVentanaRecurso(zRecursoViewModel);
    }

    onCampoZoomClick(zreferenciaViewModel: ZRecursos.ZReferenciaViewModel){
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

