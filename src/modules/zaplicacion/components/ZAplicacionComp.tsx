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
    ZMenuComp

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
}
const mapStateToProps = (state:ZAplication.State, ownProps:OwnProps) : ConnectedState => ({
    zmenuModel:state.zaplicationState.zmenuModel,
    mapRecursosActivos:state.zaplicationState.mapRecursosIndxByCtx,
});

interface ConnectedDispatch
{
    desparcharRecurso: (zmenuItemModel: ZMenuItemModel) => void
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZAplication.ZAplicationState>): ConnectedDispatch => ({
  desparcharRecurso:(zmenuItemModel: ZMenuItemModel) => dispatch(ZAplication.Actions.desparcharRecurso(zmenuItemModel))
});


class ZAplicacionComp extends React.Component<ConnectedDispatch & ConnectedState & OwnProps, undefined>
{    
    constructor(props: ConnectedDispatch & ConnectedState & OwnProps) {
        super(props);

        this.mostrarRecurso = this.mostrarRecurso.bind(this);
        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
    }

    render() {

        return (
            <div className="container">
                <ZMenuComp 
                    zmenuModel={this.props.zmenuModel}
                    index={0}
                    despacharOpcionMenuFn={this.mostrarRecurso} />

                <ZAreaTrabajo 
                    mapRecursosActivos={this.props.mapRecursosActivos}
                    cerrarVentanaRecursoFn={this.cerrarVentanaRecurso} />

            </div>
        );
    }


    mostrarRecurso(zmenuItemModel: ZMenuItemModel) {
        this.props.desparcharRecurso(zmenuItemModel);
    }

    cerrarVentanaRecurso(recursoACerrarId: string) {

        if(1 == 1){
            return;
        }

        let { mapRecursosActivos } = this.props;
        let mapRecursosActivosUpdated: Map<string, ZRecursoViewModel> = new Map<string, ZRecursoViewModel>();

        if (!mapRecursosActivos.has(recursoACerrarId)) {
            return;
        }

        let zrecursoModelWebAAbrir: ZRecursoViewModel = null;
        let recursoAAbrirId: string = null;
        let zrecursoModelWebACerrar: ZRecursoViewModel = mapRecursosActivos.get(recursoACerrarId);
        zrecursoModelWebACerrar.activo = false;

        let keysIterable: IterableIterator<string> = mapRecursosActivos.keys();
        for (let i = 0; i < mapRecursosActivos.size; i++) {
            let zrecursoModelWebForKey: string = keysIterable.next().value;
            if (zrecursoModelWebForKey == recursoACerrarId) {
                if (i < mapRecursosActivos.size - 1) {
                    recursoAAbrirId = keysIterable.next().value;
                }
            }
        }

        mapRecursosActivos.forEach((zrecursoAAgregar: ZRecursoViewModel, recursoIdAAgregar: string) => {
            if (recursoIdAAgregar == recursoAAbrirId) {
                zrecursoAAgregar.activo = true;
            }
            else {
                zrecursoAAgregar.activo = false;
            }
            mapRecursosActivosUpdated.set(recursoIdAAgregar, zrecursoAAgregar);
        });

        this.setState({
            mapRecursosActivos: mapRecursosActivosUpdated
        });
    }
}

const ZAplicacionComponent: React.ComponentClass<OwnProps> = 
connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZAplicacionComp);

export 
{
    ZAplicacionComponent
}

