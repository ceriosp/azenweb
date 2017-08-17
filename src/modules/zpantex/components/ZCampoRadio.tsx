import * as React from 'react';

import {
    Radio
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo
} from "../../zcommon";

interface OwnProperties
{
    zCampoModel:IZCampo;
}

export default class ZCampoRadio extends React.PureComponent<OwnProperties, undefined>
{
    render(){

        const { zCampoModel } = this.props;

        return (            
                <Radio name={zCampoModel.nomCmp} inline>
                    {zCampoModel.etq.replace("( )", "")}
                </Radio>
        );
    }
}