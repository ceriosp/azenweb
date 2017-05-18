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
    ZCampoModel,
    ZRecursoModel,
    ZRecursoViewModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZRecurso from './ZRecurso';

interface OwnProps
{
    recursoActivo?:ZRecursoViewModel;
    mapRecursosActivos: Map<string, ZRecursoViewModel>;
    cerrarVentanaRecursoFn:(recursoId:string)=>void
}

export default class ZAreaTrabajo extends React.Component<OwnProps, undefined>
{
    private divAreaTrabajo:HTMLDivElement;
    
    private recursosIterable: IterableIterator<ZRecursoModel>;

    private zcamposForma:Array<ZCampoModel> = [];
    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];            


    constructor(props:OwnProps){
        super(props);
    }

    render(){
        
        this.clasificarCamposAPintar();

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
                                this.props.mapRecursosActivos && this.props.mapRecursosActivos.size >= 0 ?
                                    this.getRecursosActivos().map((recursoActivo:ZRecursoViewModel, index:number)=>{
                                        return (
                                            <ZRecurso    
                                                key={recursoActivo.ven.nomTbl}
                                                zRecursoModelWeb={recursoActivo}
                                                zcamposForma={this.zcamposForma}
                                                onHide={this.cerrarVentanaRecurso.bind(this, recursoActivo.ven.nomTbl)}
                                                container={this.divAreaTrabajo}/>
                                        );
                                    })
                                : null
                            }                            
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }

    clasificarCamposAPintar(){        
        
        if(!this.props.recursoActivo){
            return;
        }

        let zcamposForma:Array<ZCampoModel> = new Array<ZCampoModel>();

        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<this.props.recursoActivo.camps.length; i++){

            zcampoAPintar = this.props.recursoActivo.camps[i];
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

            zcamposForma.push(zcampoAPintar);
        }

        this.zcamposForma = zcamposForma;

        return zcamposForma;

    }

    getRecursosEnFormaIds():Array<string>{  

        let { mapRecursosActivos } = this.props;

        let recursosActivosIds:Array<string> = new Array<string>();          

        mapRecursosActivos.forEach((zrecursoEnFor:ZRecursoViewModel, recursoIdEnFor:string)=>{
            if(zrecursoEnFor.activo == true){
                recursosActivosIds.push(recursoIdEnFor);
                return true;
            }
        });   

        return recursosActivosIds;
    }

    getRecursosActivos():Array<ZRecursoViewModel>{  

        let { mapRecursosActivos } = this.props;

        let recursosActivosIds:Array<ZRecursoViewModel> = new Array<ZRecursoViewModel>();          

        mapRecursosActivos.forEach((zrecursoEnFor:ZRecursoViewModel, recursoIdEnFor:string)=>{
            recursosActivosIds.push(zrecursoEnFor);
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
                
            }
        }        
    }


    cerrarVentanaRecurso(recursoId:string, e:any){

        this.props.cerrarVentanaRecursoFn(recursoId);

        /*
        let hashStackRecursosVisibility: Map<string, boolean> = this.state.hashStackRecursosVisibility;
        hashStackRecursosVisibility.set(recursoId, false);

        this.setState({
            hashStackRecursosVisibility:hashStackRecursosVisibility
        });
        */
    }    
/*
        clasificarCamposAPintar(){        
        
        let zcamposForma:Array<ZCampoModel> = new Array<ZCampoModel>();

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

            zcamposForma.push(zcampoAPintar);
        }

        return zcamposForma;

    }
    */
}