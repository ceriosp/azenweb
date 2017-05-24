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
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel,    
} from "../model";

import * as ZRecursos from "../../zrecursos";

import ZBarraBotones from './ZBarraBotones';
import ZRecursoBasico from './ZRecursoBasico';
import ZRecursoZoom from './ZRecursoZoom';

interface OwnProperties
{    
    onHideFn?:(zRecursoViewModel:ZRecursoViewModel)=>void;
    container?:any;
    zRecursoViewModel:ZRecursoViewModel;
    onCampoZoomClick?: (zreferenciaViewModel:  ZRecursos.ZReferenciaViewModel) => void 
}

export default class ZVentanaRecurso extends React.Component<OwnProperties, void>
{
    private zRecursoViewModel:ZRecursoViewModel;

    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];        

    constructor(props:OwnProperties){        
        super(props);
        console.log("constructor ventana recurso " + this.props.zRecursoViewModel.ven.nomTbl);

        this.cerrarVentana = this.cerrarVentana.bind(this);
    }
    
    render(){        

        this.renderInitialize();

        let modalStyle:any = new Object();
        
        if(this.props.zRecursoViewModel.activo){
            modalStyle = {
                display:"block",
                top:"50px"               
            } as CSSProperties;
        }else{
            modalStyle = {
                display:"none",
            } as CSSProperties;
        }

        this.zRecursoViewModel = this.props.zRecursoViewModel;     
                
        return (                            
                <Modal 
                    id={this.zRecursoViewModel.ven.nomTbl}
                    style={modalStyle}
                    onHide={this.cerrarVentana} 
                    show={true}
                    container={this.props.container}
                    backdrop={false}
                    enforceFocus={false}
                    autoFocus={false}                    
                    bsSize="large"
                    aria-labelledby="contained-modal-title">    

                    <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title>{this.zRecursoViewModel.ven.descr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.getTipoRecursoAPintar()}
                    </Modal.Body>

                    <Modal.Footer>
                        <ZBarraBotones
                            zcamposBotonesComandosList={this.zcamposBotonesComandos}
                            zcamposBotonesLineaList={this.zcamposBotonesLineaList}/>
                    </Modal.Footer>
                </Modal>                

        );
    }

    cerrarVentana(){
        this.props.onHideFn(this.props.zRecursoViewModel);
    }

    renderInitialize(){        
        this.zcamposBotonesComandos = new Array<ZCampoModel>();
        this.zcamposBotonesLineaList = new Array<ZCampoModel>();
        this.clasificarBotonesAPintar();
    }    

    clasificarBotonesAPintar(){
        
        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<this.props.zRecursoViewModel.camps.length; i++){

            zcampoAPintar = this.props.zRecursoViewModel.camps[i];
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
        }
    }

    getTipoRecursoAPintar(){

        switch(this.zRecursoViewModel.tipoRecurso){

            case ZRecursos.Constants.TipoRecurso.Basico:
                return <ZRecursoBasico zRecursoViewModel={this.zRecursoViewModel} onCampoZoomClick={this.props.onCampoZoomClick}/>;

            case ZRecursos.Constants.TipoRecurso.Zoom:
                return <ZRecursoZoom zRecursoViewModel={this.zRecursoViewModel}/>;
        }
    }
}