import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col
} from 'react-bootstrap';

import * as ZRecursos from "../../zrecursos";
import {
    //Models
    ZRecursoModel,
    ZRecursoViewModel,

    //Components
    ZVentanaRecurso

} from "../../zrecursos";


interface OwnProps
{
    mapRecursosActivosIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIdList:Array<string>,
    cerrarVentanaRecursoFn:(zRecursoViewModel:ZRecursoViewModel)=>void;
    onCampoZoomClick?: (zreferenciaViewModel:  ZRecursos.ZReferenciaViewModel) => void 
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
                               this.props.recursosActivosIdList.map((recursoId:string, index:number)=>{
                                        return (
                                            <ZVentanaRecurso    
                                                key={recursoId}                     
                                                zRecursoViewModel={this.props.mapRecursosActivosIndxById.get(recursoId)}                                                 
                                                onHideFn={this.cerrarVentanaRecurso}
                                                container={this.divAreaTrabajo}
                                                onCampoZoomClick={this.props.onCampoZoomClick}/>
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