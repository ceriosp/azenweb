import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,    
    Col,
    Form,
    Button, 
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
    private previousRow:number = 0;
    private currentRow:number = 0;

    renderZCampo(zCampoModel:ZCampoModel, index:number){          
        return (
            <ZCampo key={index} zCampoModel={zCampoModel} index={index} />
        );
    }

    formSubmitted(e: React.SyntheticEvent<HTMLButtonElement>){
        e.preventDefault();
        let sourceEventButton:HTMLButtonElement = e.target as HTMLButtonElement;
        console.log(sourceEventButton);
        // + ReactDOM.findDOMNode<HTMLInputElement>(this.refs.cmp_1).value
        alert("Form submitted: " + sourceEventButton.name + " ");
    }

    render(){

        let { zRecursoModel } = this.props;

        return (            
            <div>
                <Form onSubmit={this.formSubmitted.bind(this)}>
                    {zRecursoModel.camps.map(this.renderZCampo)}
                    <hr/>
                    <Button name="guardar" type="submit"> Guardar </Button>
                    <Button name="nuevo" type="submit"> Nuevo </Button>
                </Form>                
            </div>
        );
    }
}