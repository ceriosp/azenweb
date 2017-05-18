import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

interface OwnProps
{
    zCampoModel:ZCampoModel;
}

interface OwnState
{
    value:string
}

export default class ZTextbox extends React.Component<OwnProps, OwnState>
{
    
    constructor(props:any){
        super(props);
        this.state = {
            value:""
        }
        //console.log("construye textbox");
    }

    render(){
        const { zCampoModel } = this.props;
        return (
            <FormGroup controlId={zCampoModel.nomCmp} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zCampoModel.etq}
                    </Col>
                    <Col>
                        <FormControl value={this.state.value} onChange={this.onChange.bind(this)} type="text"/>
                    </Col>                
                </Col>
            </FormGroup>
        );
    }

    onChange(evento:any) {
        this.setState({ value: evento.target.value });
    }
}
