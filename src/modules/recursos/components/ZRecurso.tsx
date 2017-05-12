import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col,
    Form,
    Button, 
    Modal,
    Panel 
} from 'react-bootstrap';

import {
    ZRecursoModel,
    ZCampoModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZCampo from './ZCampo';
import ZBarraBotones from './ZBarraBotones';

interface OwnProperties
{
    show?:boolean;
    onHide?:()=>void;
    zRecursoModel:ZRecursoModel;
}

export default class ZRecurso extends React.Component<OwnProperties, void>
{
    private zRecursoModel:ZRecursoModel;
    private zcampoRegionActual:ZCampoModel;

    private zcamposForma:Array<ZCampoModel> = [];
    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];    

    render(){
        
        this.zRecursoModel = this.props.zRecursoModel;        
        this.clasificarCamposAPintar();

        return (                            
                <Modal 
                    onHide={this.props.onHide} 
                    show={this.props.show}
                    bsSize="large"
                    aria-labelledby="contained-modal-title-lg">
                    <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title>{this.zRecursoModel.ven.descr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Panel>
                            <Form onSubmit={this.formSubmitted.bind(this)} horizontal>
                                {this.zcamposForma.map(this.pintarZCampoEnRecurso.bind(this))}
                            </Form>      
                        </Panel>
                    </Modal.Body>

                    <Modal.Footer>
                        <ZBarraBotones
                            zcamposBotonesComandosList={this.zcamposBotonesComandos}
                            zcamposBotonesLineaList={this.zcamposBotonesLineaList}/>
                    </Modal.Footer>
                </Modal>                

        );
    }

    pintarZCampoEnRecurso(zcampoAPintar:ZCampoModel, index:number){
        
        if(this.estaCampoEnRegionActual(zcampoAPintar)){
            return;
        }

        let zcamposEnRegionActualList : Array<ZCampoModel> = new Array<ZCampoModel>();        
        let esCheckboxAislado:boolean = false;
        if(zcampoAPintar.etq.startsWith("@R")) //Region
        {
            zcamposEnRegionActualList = this.getCamposEnRegion(zcampoAPintar, index);
        } 
        else if(zcampoAPintar.claseInd == RecursosConstants.CAMPO_RADIO){            
            esCheckboxAislado = true;
        }                

        return (
                <Col key={index} md={6}>
                    <ZCampo key={index} 
                        zCampoModel={zcampoAPintar}
                        esCheckboxAislado={esCheckboxAislado}
                        zcamposEnRegionList={zcamposEnRegionActualList} />
                </Col>
        );
    }

    getCamposEnRegion(zcampoRegion:ZCampoModel, zcampoRegionIndex:number):Array<ZCampoModel>{

        let { camps } = this.zRecursoModel;
    
        this.zcampoRegionActual = zcampoRegion;

        let zcamposEnGrupoList : Array<ZCampoModel> = new Array<ZCampoModel>();
        let campsSlice = camps.slice(zcampoRegionIndex+1, camps.length-1);
        for(let i=0; i<campsSlice.length; i++){
            if(this.estaCampoEnRegionActual(campsSlice[i])){
                zcamposEnGrupoList.push(campsSlice[i]);
            }
            else{
                break;
            }                
        }

        return zcamposEnGrupoList;
    }

    estaCampoEnRegionActual(zcampoModel: ZCampoModel):boolean{        

        if(this.zcampoRegionActual == null){
            return false;
        }

        return (            
            (this.zcampoRegionActual.filEtq < zcampoModel.filEtq && 
            zcampoModel.filEtq < this.zcampoRegionActual.filCmp) &&
            (this.zcampoRegionActual.colEtq < zcampoModel.colEtq &&
            zcampoModel.colEtq < this.zcampoRegionActual.colCmp)
        );
    }

    clasificarCamposAPintar(){
        
        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<this.props.zRecursoModel.camps.length; i++){

            zcampoAPintar = this.props.zRecursoModel.camps[i];
            if(zcampoAPintar.etq.startsWith("@@B") || zcampoAPintar.etq.startsWith("@B")) //Botón
            {
                this.zcamposBotonesComandos.push(zcampoAPintar);
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@L"))//Botones línea comandos
            {            
                this.zcamposBotonesLineaList.push(zcampoAPintar);
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@@H"))//Línea horizontal
            {                
                continue;
            }            

            this.zcamposForma.push(zcampoAPintar);
        }
    }

    formSubmitted(e: React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        let sourceEventButton:HTMLButtonElement = e.target as HTMLButtonElement;
        console.log(sourceEventButton);
        alert("Form submitted: " + sourceEventButton.name + " ");
    }    
}