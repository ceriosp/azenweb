import * as React from 'react';

import {
    Col,
    Checkbox
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo
} from "../../zcommon";

interface OwnProperties
{
    zCampoModel:IZCampo;
}

export default class ZCampoCheckbox extends React.PureComponent<OwnProperties, undefined>
{
    render(){

        const { zCampoModel } = this.props;

        return (            
                <Checkbox name={zCampoModel.nomCmp} value={zCampoModel.lon}>
                    {zCampoModel.etq.replace("[ ]", "")}
                </Checkbox>
        );
    }
}