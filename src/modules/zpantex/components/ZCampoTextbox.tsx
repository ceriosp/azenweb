import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo
} from "../../zcommon";

interface OwnProperties
{
    zCampoModel:IZCampo;
}

export default class ZCampoTextbox extends React.PureComponent<OwnProperties, undefined>
{
    render(){
        const { zCampoModel } = this.props;
        return (
            <FormGroup controlId={zCampoModel.nomCmp} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zCampoModel.etq}
                    </Col>
                    <Col>
                        <FormControl type="text"/>
                    </Col>                
                </Col>
            </FormGroup>
        );
    }
}
