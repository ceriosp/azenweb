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

interface OwnProps
{
    recursosActivosViewModelList: Array<ZRecursoViewModel>;
}

export default class ZAreaTrabajo extends React.Component<OwnProps, undefined>
{
    private divAreaTrabajo:HTMLDivElement;    

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

                            Area divAreaTrabajo 3

                            
                                {/*
                               this.props.recursosActivosIdList
                               .map((recursoId:string, index:number)=>{
                                        return (
                                            <ZVentanaRecurso    
                                                key={index}    
                                                mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}                 
                                                zRecursoViewModel={this.props.mapRecursosActivosIndxById.get(recursoId)}
                                                onCerrarVentanaFn={this.cerrarVentanaRecurso}
                                                container={this.divAreaTrabajo}
                                                onCampoZoomClick={this.props.onCampoZoomClick}
                                                esModal={this.props.mostrandoVentanaModal}/>
                                        );
                                })
                                */}         
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}