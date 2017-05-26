import * as React from 'react';

import {
    Radio
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../../zcommon";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
}

export default class ZRadio extends React.Component<OwnProperties, void>
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