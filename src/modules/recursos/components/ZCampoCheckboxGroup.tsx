import * as React from 'react';

import {
    Col,    
    Panel,
    Checkbox
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import ZCampoCheckbox from './ZCampoCheckbox';

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    zCamposModelCheckboxOptions:Array<ZCampoModel>
}

export default class ZCampoCheckboxGroup extends React.Component<OwnProperties, void>
{
    public static defaultProps: Partial<OwnProperties> = {
        zCamposModelCheckboxOptions : new Array<ZCampoModel>()
    };

    render(){

        const { zCampoModel, zCamposModelCheckboxOptions } = this.props;

        return (
            <Panel header={zCampoModel.etq.replace("@R", "")} bsStyle="info">                
                {zCamposModelCheckboxOptions.map((zcampoModelRadioOption:ZCampoModel, index:number) => {
                    return (
                        <Col xs={12} sm={4} md={3}>
                            <ZCampoCheckbox zCampoModel={zcampoModelRadioOption} />
                        </Col>
                    );
                })}
            </Panel>            
        );
    }
}


