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

export default class ZCampoButton extends React.Component<OwnProperties, void>
{
    render(){
        const { zCampoModel } = this.props;

        return (
            <FormControl type="text"/>
        );
    }
}
