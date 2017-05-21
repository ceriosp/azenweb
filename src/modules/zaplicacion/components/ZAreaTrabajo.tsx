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
    cerrarVentanaRecursoFn:(recursoId:string)=>void
}

export default class ZAreaTrabajo extends React.Component<OwnProps, undefined>
{
    private divAreaTrabajo:HTMLDivElement;
    
    private recursosIterable: IterableIterator<ZRecursoModel>;

    constructor(props:OwnProps){
        super(props);
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
                               this.getRecursosEnFormaIds().map((recursoId:string, index:number)=>{
                                        return (
                                            <ZRecurso    
                                                key={recursoId}                     
                                                zRecursoModelWeb={this.props.mapRecursosActivos.get(recursoId)}                                                 
                                                onHide={this.cerrarVentanaRecurso.bind(this, recursoId)}
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


    getRecursosEnFormaIds():Array<string>{  

        let { mapRecursosActivos } = this.props;

        let recursosActivosIds:Array<string> = new Array<string>();          

        mapRecursosActivos.forEach((zrecursoEnFor:ZRecursoViewModel, recursoIdEnFor:string)=>{
            recursosActivosIds.push(recursoIdEnFor);
        });   

        return recursosActivosIds;
    }

    getRecursoAPintar(){

        let { mapRecursosActivos } = this.props;
        let recursosAPintar:Array<ZRecursoViewModel> = [];        
        let keysIterable: IterableIterator<string> = mapRecursosActivos.keys();
        for (let i = 0; i < mapRecursosActivos.size; i++) {
            let zrecursoModelWebForKey: string = keysIterable.next().value;
            if(mapRecursosActivos.get(zrecursoModelWebForKey).activo){
                recursosAPintar.push();
            }
        }        
    }

    cerrarVentanaRecurso(recursoId:string, e:any){
        this.props.cerrarVentanaRecursoFn(recursoId);
    }    
}