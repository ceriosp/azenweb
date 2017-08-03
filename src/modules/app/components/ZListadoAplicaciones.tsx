import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col
} from 'react-bootstrap';

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
    ZVentanaRecurso
} from "../../zrecursos";

export interface OwnProps
{
    
}

export interface ConnectedState
{

}

export interface ConnectedDispatch
{
    lanzarAplicacion: (identificadorAplicacion: string) => void;
}

export class ZListadoAplicaciones extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{    
    constructor(props:OwnProps & ConnectedState & ConnectedDispatch){

        super(props);

        this.lanzarAplicacion = this.lanzarAplicacion.bind(this);
    }

    render(){        
        return (            
            <div>
                <div>Listado aplicaciones</div>
                <input 
                    type='button' 
                    value='azenctb'
                    onClick={this.lanzarAplicacion}
                />
            </div>
        );
    }

    lanzarAplicacion(e:any){
        this.props.lanzarAplicacion(e.target.value);
    }
}