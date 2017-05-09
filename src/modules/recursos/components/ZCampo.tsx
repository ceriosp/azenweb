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

export default class ZCampo extends React.Component<OwnProperties, void>
{
    render(){
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={10}>
                    {this.props.zCampoModel.etq}
                </Col>
                <Col componentClass={ControlLabel} sm={5}>
                    <FormControl type="text"/>
                </Col>
            </FormGroup>
        );
    }
}