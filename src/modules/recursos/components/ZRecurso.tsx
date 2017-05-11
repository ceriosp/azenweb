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
    private currentZModelRadioName:string;

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

    renderZCampo(zCampoModel:ZCampoModel, index:number){
        
        if(zCampoModel.nomCmp == this.currentZModelRadioName){
            return;
        }

        let { camps } = this.zRecursoModel;

        let zcamposModelCheckRadioOptions : Array<ZCampoModel> = new Array<ZCampoModel>();
        let claseInd:number = zCampoModel.claseInd;
        let esCheckBoxGroup:boolean = true;
        if(zCampoModel.etq.startsWith("@R"))
        {            
            this.currentZModelRadioName = camps[index+1].nomCmp;

            zcamposModelCheckRadioOptions = camps.filter((zCampoModelFilter:ZCampoModel)=>{
                return zCampoModelFilter.nomCmp == this.currentZModelRadioName;
            });  

            if(camps[index+1].claseInd == RecursosConstants.CAMPO_RADIO){
                claseInd = RecursosConstants.CAMPO_RADIO;
            }else{
                claseInd = RecursosConstants.CAMPO_CHECKBOX;
            }            
        } 
        else if(zCampoModel.claseInd == RecursosConstants.CAMPO_RADIO){
            esCheckBoxGroup = false;
        } else if(zCampoModel.etq.startsWith("@@B") || zCampoModel.etq.startsWith("@B"))
        {
            return;
        }

        return (
            <ZCampo key={index} 
                    zCampoModel={zCampoModel}
                    claseInd={claseInd}
                    esCheckBoxGroup={esCheckBoxGroup}
                    zcamposModelCheckRadioOptions={zcamposModelCheckRadioOptions} 
                    index={index} />
        );
    }

    formSubmitted(e: React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        let sourceEventButton:HTMLButtonElement = e.target as HTMLButtonElement;
        console.log(sourceEventButton);
        alert("Form submitted: " + sourceEventButton.name + " ");
    }    
}