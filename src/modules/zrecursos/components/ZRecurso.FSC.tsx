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
    ZCampoModel
} from "../model";

import {
    Recursos
} from "../constants";

import ZCampo from './ZCampo';
import ZBarraBotones from './ZBarraBotones';

interface OwnProperties
{    
    onHide?:()=>void;
    container?:any;
    zRecursoViewModel:ZRecursoViewModel;    
}

    let zcampoRegionEnProceso:ZCampoModel;
    let zcamposForma:Array<ZCampoModel> = [];
    let zcamposBotonesComandos: Array<ZCampoModel> = [];
    let zcamposBotonesLineaList: Array<ZCampoModel> = [];    

export const ZRecursoFSC: React.SFC<OwnProperties> = (props:OwnProperties) => {

    const  { zRecursoViewModel } = props;

    console.log("construye zrecxurso: " + zRecursoViewModel.ven.nomTbl);


    let modalStyle:CSSProperties = new Object();
    
    if(zRecursoViewModel.activo){
        modalStyle = {
            display:"block",
            top:"50px",                
        } as CSSProperties;
    }else{
        modalStyle = {
            display:"none",
        } as CSSProperties;
    }

    const clasificarCamposAPintar = () => {
        
        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<zRecursoViewModel.camps.length; i++){

            zcampoAPintar = zRecursoViewModel.camps[i];
            if(zcampoAPintar.etq.startsWith("@@B") || zcampoAPintar.etq.startsWith("@B")) //Botón
            {
                zcamposBotonesComandos.push(zcampoAPintar);
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@L"))//Botones línea comandos
            {            
                zcamposBotonesLineaList.push(zcampoAPintar);
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@@H"))//Línea horizontal
            {                
                continue;
            }            

            zcamposForma.push(zcampoAPintar);
        }
    }

    const pintarZCampoEnRecurso = (zcampoAPintar:ZCampoModel, index:number) => {

        if(estaCampoEnRegionEnProceso(zcampoAPintar)){
            return;
        }

        let zcamposEnRegionActualList : Array<ZCampoModel> = new Array<ZCampoModel>();        
        let esCheckboxAislado:boolean = false;
        if(zcampoAPintar.etq.startsWith("@R")) //Region
        {
            zcamposEnRegionActualList = getCamposEnRegion(zcampoAPintar, index);
        } 
        else if(zcampoAPintar.claseInd == Recursos.Constants.CAMPO_RADIO){            
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

    const getCamposEnRegion = (zcampoRegion:ZCampoModel, zcampoRegionIndex:number):Array<ZCampoModel> => {

        let { camps } = zRecursoViewModel;
    
        zcampoRegionEnProceso = zcampoRegion;

        let zcamposEnGrupoList : Array<ZCampoModel> = new Array<ZCampoModel>();
        let campsSlice = camps.slice(zcampoRegionIndex+1, camps.length-1);
        for(let i=0; i<campsSlice.length; i++){
            if(estaCampoEnRegionEnProceso(campsSlice[i])){
                zcamposEnGrupoList.push(campsSlice[i]);
            }
            else{
                break;
            }                
        }

        return zcamposEnGrupoList;
    }

    const estaCampoEnRegionEnProceso = (zcampoModel: ZCampoModel):boolean => {

        if(zcampoRegionEnProceso == null){
            return false;
        }

        return (            
            (zcampoRegionEnProceso.filEtq < zcampoModel.filEtq && 
            zcampoModel.filEtq < zcampoRegionEnProceso.filCmp) &&
            (zcampoRegionEnProceso.colEtq < zcampoModel.colEtq &&
            zcampoModel.colEtq < zcampoRegionEnProceso.colCmp)
        );
    }
    
    
    clasificarCamposAPintar();

    return (
            <Modal 
                id={zRecursoViewModel.ven.nomTbl}
                style={modalStyle}
                onHide={props.onHide} 
                show={true}
                container={props.container}
                backdrop={false}
                enforceFocus={false}
                autoFocus={false}                    
                bsSize="large"
                aria-labelledby="contained-modal-title">    

                <Modal.Header className="bg-primary" closeButton>
                    <Modal.Title>{zRecursoViewModel.ven.descr}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form horizontal>
                        {zcamposForma.map(pintarZCampoEnRecurso)}
                    </Form>      
                </Modal.Body>

                <Modal.Footer>
                    <ZBarraBotones
                        zcamposBotonesComandosList={zcamposBotonesComandos}
                        zcamposBotonesLineaList={zcamposBotonesLineaList}/>
                </Modal.Footer>
            </Modal>                
    );
}