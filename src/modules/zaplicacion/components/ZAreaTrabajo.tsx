import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZRecursoModel,
    ZRecursoViewModel,
    ZReferenciaViewModel
} from "../../zcommon";

import {    
    //Components
    ZVentanaRecurso
} from "../../zrecursos";

interface OwnProps
{
    onCerrarVentanaRecursoFn:(zRecursoViewModel:ZRecursoViewModel)=>void;
    mapRecursosActivosIndxById: Map<string, ZRecursoViewModel>;
    mapRecursosZoomActivosIndxById: Map<string, ZRecursoViewModel>;
    recursosActivosIdList:Array<string>,    
    onCampoZoomClick?: (zreferenciaViewModel:  ZReferenciaViewModel) => void 
    mostrandoVentanaModal:boolean;
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
                               this.props.recursosActivosIdList
                               .map((recursoId:string, index:number)=>{
                                        return (
                                            <ZVentanaRecurso    
                                                key={recursoId}    
                                                mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}                 
                                                zRecursoViewModel={this.props.mapRecursosActivosIndxById.get(recursoId)}
                                                onCerrarVentanaFn={this.cerrarVentanaRecurso}
                                                container={this.divAreaTrabajo}
                                                onCampoZoomClick={this.props.onCampoZoomClick}
                                                esModal={this.props.mostrandoVentanaModal}/>
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
        this.props.onCerrarVentanaRecursoFn(zRecursoViewModel);
    }    
}