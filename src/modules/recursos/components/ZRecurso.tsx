import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col,
    Form,
    Button, 
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

interface OwnProperties
{
    zRecursoModel:ZRecursoModel;
}

export default class ZRecurso extends React.Component<OwnProperties, void>
{
    private zRecursoModel:ZRecursoModel;    
    private currentzCampoRegion:ZCampoModel;

    render(){

        this.zRecursoModel = this.props.zRecursoModel;        

        return (
            <div className="container" style={{marginTop:"20px"}}>
                 <Panel header={this.zRecursoModel.ven.descr} bsStyle="primary">                     
                    <Form onSubmit={this.formSubmitted.bind(this)} horizontal>                    
                        {
                            this.zRecursoModel.camps.map(this.renderZCampo.bind(this))
                        }
                        <hr/>
                        <Button name="guardar" type="submit"> Guardar </Button>
                        <Button name="nuevo" type="submit"> Nuevo </Button>
                    </Form>      
                </Panel>
            </div>
        );
    }

    renderZCampo(zcampoAPintar:ZCampoModel, index:number){
        
        if(this.estaCampoEnCurrentRegion(zcampoAPintar)){
            return;
        }

        let zcamposEnRegionList : Array<ZCampoModel> = new Array<ZCampoModel>();        
        let esCheckBoxGroup:boolean = true;
        if(zcampoAPintar.etq.startsWith("@R")) //REgion
        {
            zcamposEnRegionList = this.getCamposEnRegion(zcampoAPintar, index);
        } 
        else if(zcampoAPintar.claseInd == RecursosConstants.CAMPO_RADIO){            
            esCheckBoxGroup = false;
        } else if(zcampoAPintar.etq.startsWith("@@B") || zcampoAPintar.etq.startsWith("@B")) //Botón
        {
            return;
        }

        return (
                <Col md={6}>
                    <ZCampo key={index} 
                        zCampoModel={zcampoAPintar}
                        esCheckBoxGroup={esCheckBoxGroup}
                        zcamposEnRegionList={zcamposEnRegionList} />
                </Col>
        );
    }

    getCamposEnRegion(zcampoRegion:ZCampoModel, zcampoRegionIndex:number):Array<ZCampoModel>{

        let { camps } = this.zRecursoModel;
    
        this.currentzCampoRegion = zcampoRegion;

        let zcamposEnGrupoList : Array<ZCampoModel> = new Array<ZCampoModel>();
        let campsSlice = camps.slice(zcampoRegionIndex+1, camps.length-1);
        for(let i=0; i<campsSlice.length; i++){
            if(this.estaCampoEnCurrentRegion(campsSlice[i])){
                zcamposEnGrupoList.push(campsSlice[i]);
            }
            else{
                break;
            }                
        }

        return zcamposEnGrupoList;
    }

    estaCampoEnCurrentRegion(zcampoModel: ZCampoModel):boolean{        

        if(this.currentzCampoRegion == null){
            return false;
        }

        return (            
            (this.currentzCampoRegion.filEtq < zcampoModel.filEtq && 
            zcampoModel.filEtq < this.currentzCampoRegion.filCmp) &&
            (this.currentzCampoRegion.colEtq < zcampoModel.colEtq &&
            zcampoModel.colEtq < this.currentzCampoRegion.colCmp)
        );
    }

    formSubmitted(e: React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        let sourceEventButton:HTMLButtonElement = e.target as HTMLButtonElement;
        console.log(sourceEventButton);
        alert("Form submitted: " + sourceEventButton.name + " ");
    }    
}