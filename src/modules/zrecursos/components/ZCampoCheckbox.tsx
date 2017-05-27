import * as React from 'react';

import {
    Col,
    Checkbox
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../../zcommon";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
}

export default class ZCampoCheckbox extends React.Component<OwnProperties, void>
{
    render(){

        const { zCampoModel } = this.props;

        return (            
                <Checkbox>
                    {zCampoModel.etq.replace("[ ]", "")}
                </Checkbox>
        );
    }
}