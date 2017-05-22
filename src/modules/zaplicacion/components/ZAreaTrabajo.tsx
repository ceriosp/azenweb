import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col,
    Form,
    Modal,
    Glyphicon,
    Navbar,
    Nav,
    MenuItem,
    NavItem,
    NavDropdown,
    Button
} from 'react-bootstrap';

import {
    //Models
    ZRecursoModel,
    ZRecursoViewModel,

    //Constants
    Recursos,

    //Components
    ZRecurso
} from "../../zrecursos";


interface OwnProps
{
    mapRecursosActivos: Map<string, ZRecursoViewModel>;
    recursosActivosCtxList:Array<string>,
    cerrarVentanaRecursoFn:(zRecursoViewModel:ZRecursoViewModel)=>void
}

export default class ZAreaTrabajo extends React.Component<OwnProps, undefined>
{
    private divAreaTrabajo:HTMLDivElement;    

    constructor(props:OwnProps){
        super(props);

        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
    }

    render(){
        return (            
            <div>

                <style>{"\
                    .modal-container {\
                        position: relative;\
                    }\
                    .modal-container .modal, .modal-container .modal-backdrop {\
                        position: absolute;\
                    }\
                "}</style>

                <style>{"\
                    .modal-body {\
                        padding: 0px !important;\
                    }\
                "}</style>
                <Row>        
                    <Col md={12}>     
                        <div ref={(divTrabajo:HTMLDivElement)=>{
                                this.divAreaTrabajo = divTrabajo;
                            }}>
                            {
                               this.props.recursosActivosCtxList.map((recursoId:string, index:number)=>{
                                        return (
                                            <ZRecurso    
                                                key={recursoId}                     
                                                zRecursoViewModel={this.props.mapRecursosActivos.get(recursoId)}                                                 
                                                onHideFn={this.cerrarVentanaRecurso}
                                                container={this.divAreaTrabajo}/>
                                        );
                                })
                            }                   
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    cerrarVentanaRecurso(zRecursoViewModel:ZRecursoViewModel){
        this.props.cerrarVentanaRecursoFn(zRecursoViewModel);
    }    
}