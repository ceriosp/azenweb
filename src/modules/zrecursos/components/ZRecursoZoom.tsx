import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Panel,
    Table
} from 'react-bootstrap';

import {
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel
} from "../../zcommon";

import ZCampo from './ZCampo';

interface OwnProperties
{    
    zRecursoViewModel:ZRecursoViewModel;    
}

export default class ZRecursoBasico extends React.Component<OwnProperties, void>
{
    private zRecursoViewModel:ZRecursoViewModel;
    private zcampoRegionEnProceso:ZCampoModel;

    private zcamposForma:Array<ZCampoModel> = [];

    constructor(props:OwnProperties){        
        super(props);
    }
    
    render(){
        
        this.renderInitialize();

        let modalStyle:any = new Object();
        
        this.zRecursoViewModel = this.props.zRecursoViewModel;     
        this.clasificarCamposAPintar();
                
        return (
            <Panel>
                <Table striped bordered condensed hover>
                    <Form  horizontal>
                        {this.zcamposForma.map(this.pintarZCampoEnRecurso.bind(this))}
                    </Form>                    
                </Table>
            </Panel>      
        );
    }

    renderInitialize(){
        this.zcamposForma = new Array<ZCampoModel>();
    }

    pintarZCampoEnRecurso(zcampoAPintar:ZCampoModel, index:number){
        return (
                <Col key={index} md={6}>
                    <th>
                        {zcampoAPintar.etq}
                    </th>
                </Col>
        );
    }

    clasificarCamposAPintar(){
        
        let zcampoAPintar:ZCampoModel;
        for(let i=0; i<this.props.zRecursoViewModel.camps.length; i++){

            zcampoAPintar = this.props.zRecursoViewModel.camps[i];
            if(zcampoAPintar.etq.startsWith("@@B") || zcampoAPintar.etq.startsWith("@B")) //Botón
            {
                continue;
            }
            if(zcampoAPintar.etq.startsWith("@L"))//Botones línea comandos
            {            
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