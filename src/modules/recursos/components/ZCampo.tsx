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

import {
    RecursosConstants
} from "../constants";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
}

export default class ZCampo extends React.Component<OwnProperties, void>
{
    render(){
        const { zCampoModel } = this.props;        

        let zCampoComponent = this.getZCampoComponent();

        return (
            <FormGroup>                
                <Col componentClass={ControlLabel} sm={10}>
                    {zCampoModel.etq} - {zCampoModel.claseInd}
                </Col>
                <Col componentClass={ControlLabel} sm={5}>
                    {zCampoComponent}
                </Col>
            </FormGroup>
        );
    }

    getZCampoComponent():any
    {
        const { zCampoModel } = this.props;        

        let zCampoComponent:any = null;        
        switch(zCampoModel.claseInd)
        {
            case RecursosConstants.CAMPO_TEXTO:
                zCampoComponent = <FormControl type="text"/>;
            break;

            case RecursosConstants.CAMPO_RADIO:
                zCampoComponent = <FormControl type="radio"/>;
            break;

            case RecursosConstants.CAMPO_CHECKBOX:
                zCampoComponent = <FormControl type="checkbox"/>;
            break;
        }

        return zCampoComponent;        
    }    
}