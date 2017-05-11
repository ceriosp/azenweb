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

interface OwnProperties
{
    zCampoModel:ZCampoModel;
}

export default class ZTextbox extends React.Component<OwnProperties, void>
{
    render(){
        const { zCampoModel } = this.props;

        return (
            <FormGroup controlId={zCampoModel.nomCmp} bsSize="small">
                <Col componentClass={ControlLabel} md={3}>
                    {zCampoModel.etq}
                </Col>                
                <Col md={9}>
                    <FormControl type="text"/>
                </Col>                
            </FormGroup>
        );
    }
}
