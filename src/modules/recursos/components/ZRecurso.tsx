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
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZCampo from './ZCampo';
import ZBarraBotones from './ZBarraBotones';

interface OwnProps
{    
    onHide?:(recursoId:string)=>void;
    container?:any;
    zRecursoModelWeb:ZRecursoViewModel;    
    zcamposForma?:Array<ZCampoModel>;
    parentKey?:string;
    activo?:boolean;
}


export default class ZRecurso extends React.Component<OwnProps, undefined>
{
    private zRecursoModel:ZRecursoModel;
    private zcampoRegionEnProceso:ZCampoModel;

    private recursosYaRenderizado:boolean = false;
    private zcamposForma:Array<ZCampoModel> = [];

    constructor(props:OwnProps){        
        super(props);
        console.log("constructor recurso " + this.props.zRecursoModelWeb.ven.nomTbl);

        this.pintarZCampoEnRecurso = this.pintarZCampoEnRecurso.bind(this);
        this.cerrarVentanaRecurso = this.cerrarVentanaRecurso.bind(this);
    }

    render(){
             
        this.zRecursoModel = this.props.zRecursoModelWeb;             
                

        let divStyle:any = new Object();

        
        if(this.props.activo){
            divStyle.display="block";
            divStyle.top = 50;
        }else{
            divStyle.display="none";
            divStyle.top = 50;
        }

        console.log("new style: " + this.zRecursoModel.ven.nomTbl);
        console.log(divStyle);

        return (                        
                <Modal 
                    style={divStyle}
                    onHide={this.cerrarVentanaRecurso} 
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
                        <Form horizontal>
                            
                            {this.props.zcamposForma.map(this.pintarZCampoEnRecurso)}
                            
                        </Form>      
                    </Modal.Body>

                    <Modal.Footer>
                        {/*
                        <ZBarraBotones
                            zcamposBotonesComandosList={this.zcamposBotonesComandos}
                            zcamposBotonesLineaList={this.zcamposBotonesLineaList}/>
                        */}
                    </Modal.Footer>
                </Modal>  
        );
    }

    componentWillMount(){
        
    }

    componentDidMount(){        
        this.recursosYaRenderizado = true;
    }

/*
    shouldComponentUpdate(){
        return !this.recursosYaRenderizado;
    }
*/
  /*
    shouldComponentUpdate(){
        return this.props.zRecursoModelWeb.activo == true && !this.recursosYaRenderizado;
    }
  */

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
                        zcamposEnRegionList={zcamposEnRegionActualList}
                         />
                </Col>
        );
    }


    cerrarVentanaRecurso(){
        this.props.onHide(this.props.zRecursoModelWeb.ven.nomTbl);
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


    formSubmitted(e: React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        let sourceEventButton:HTMLButtonElement = e.target as HTMLButtonElement;
        console.log(sourceEventButton);
        alert("Form submitted: " + sourceEventButton.name + " ");
    }    
}