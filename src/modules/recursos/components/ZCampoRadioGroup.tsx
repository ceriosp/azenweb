import * as React from 'react';

import {
    Col,    
    Panel,
    Radio
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    zCamposModelRadioOptions:Array<ZCampoModel>
}

export default class ZCampoRadioGroup extends React.Component<OwnProperties, void>
{
    public static defaultProps: Partial<OwnProperties> = {
        zCamposModelRadioOptions : new Array<ZCampoModel>()
    };

    render(){

        const { zCampoModel, zCamposModelRadioOptions } = this.props;

        return (
            <Panel header={zCampoModel.etq.replace("@R", "")} bsStyle="info">
                {zCamposModelRadioOptions.map((zcampoModelRadioOption:ZCampoModel, index:number) => {
                    return (
                        <Col xs={12} sm={4} md={3} key={index}>
                            <Radio key={index} name={zcampoModelRadioOption.nomCmp} inline>
                                {zcampoModelRadioOption.etq.replace("( )", "")}
                            </Radio>
                        </Col>
                    );
                })}
            </Panel>            
        );
    }
}


