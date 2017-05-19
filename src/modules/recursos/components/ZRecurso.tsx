import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';

import {
    Row,    
    Col,
    Form,
    Button, 
    Modal,
    Panel 
} from 'react-bootstrap';

import {
    ZRecursoModelWeb,
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
    onHide?:()=>void;
    container?:any;
    zRecursoModelWeb:ZRecursoModelWeb;    
}

export default class ZRecurso extends React.Component<OwnProperties, void>
{
    private zRecursoModel:ZRecursoModel;
    private zcampoRegionEnProceso:ZCampoModel;

    private recursosYaRenderizado:boolean = false;
    private zcamposForma:Array<ZCampoModel> = [];
    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];    

    constructor(props:OwnProperties){        
        super(props);
        console.log("constructor recurso " + this.props.zRecursoModelWeb.ven.nomTbl);
    }

    

    renderInitialize(){
        this.zcamposForma = new Array<ZCampoModel>();
        this.zcamposBotonesComandos = new Array<ZCampoModel>();
        this.zcamposBotonesLineaList = new Array<ZCampoModel>();
    }

    render(){
        
        this.renderInitialize();

        let modalStyle:any = new Object();
        
        if(this.props.zRecursoModelWeb.activo){
            modalStyle = {
                display:"block",
                top:"50px"               
            } as CSSProperties;
        }else{
            modalStyle = {
                display:"none",
            } as CSSProperties;
        }

        this.zRecursoModel = this.props.zRecursoModelWeb;     
        this.clasificarCamposAPintar();
                
        return (                            
                <Modal 
                    id={this.zRecursoModel.ven.nomTbl}
                    style={modalStyle}
                    onHide={this.props.onHide} 
                    show={true}
                    container={this.props.container}
                    backdrop={false}
                    enforceFocus={false}
                    autoFocus={false}                    
                    bsSize="large"
                    aria-labelledby="contained-modal-title">    

                    <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title>{this.zRecursoModel.ven.descr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.formSubmitted.bind(this)} horizontal>
                            {this.zcamposForma.map(this.pintarZCampoEnRecurso.bind(this))}
                        </Form>      
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

        if(this.estaCampoEnRegionEnProceso(zcampoAPintar)){
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
                    <ZCampo key={zcampoAPintar.nomCmp} 
                        zCampoModel={zcampoAPintar}
                        esCheckboxAislado={esCheckboxAislado}
                        zcamposEnRegionList={zcamposEnRegionActualList} />
                </Col>
        );
    }

    getCamposEnRegion(zcampoRegion:ZCampoModel, zcampoRegionIndex:number):Array<ZCampoModel>{

        let { camps } = this.zRecursoModel;
    
        this.zcampoRegionEnProceso = zcampoRegion;

        let zcamposEnGrupoList : Array<ZCampoModel> = new Array<ZCampoModel>();
        let campsSlice = camps.slice(zcampoRegionIndex+1, camps.length-1);
        for(let i=0; i<campsSlice.length; i++){
            if(this.estaCampoEnRegionEnProceso(campsSlice[i])){
                zcamposEnGrupoList.push(campsSlice[i]);
            }
            else{
                break;
            }                
        }

        return zcamposEnGrupoList;
    }

    estaCampoEnRegionEnProceso(zcampoModel: ZCampoModel):boolean{        

        if(this.zcampoRegionEnProceso == null){
            return false;
        }

        return (            
            (this.zcampoRegionEnProceso.filEtq < zcampoModel.filEtq && 
            zcampoModel.filEtq < this.zcampoRegionEnProceso.filCmp) &&
            (this.zcampoRegionEnProceso.colEtq < zcampoModel.colEtq &&
            zcampoModel.colEtq < this.zcampoRegionEnProceso.colCmp)
        );
    }

    clasificarCamposAPintar(){
        
        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<this.props.zRecursoModelWeb.camps.length; i++){

            zcampoAPintar = this.props.zRecursoModelWeb.camps[i];
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