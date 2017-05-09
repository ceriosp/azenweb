import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampo
} from "../model";

interface OwnProperties
{
    zCampo:ZCampo;
}

export class ZInput extends React.Component<OwnProperties, void>
{
    render(){
        return (
            <FormGroup>
                <Col componentClass={ControlLabel} sm={10}>
                    {this.props.zCampo.etq}
                </Col>
                <Col componentClass={ControlLabel} sm={10}>
                    <FormControl type="text"/>
                </Col>
            </FormGroup>
        );
    }
}