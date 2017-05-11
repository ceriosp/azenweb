import * as React from 'react';

import {
    Col,    
    Panel,
    Checkbox
} from 'react-bootstrap';

import {
    RecursosConstants
} from "../constants";

import {
    ZCampoModel
} from "../model";

import ZTextbox from './ZTextbox';
import ZRadio from './ZRadio';
import ZCheckbox from './ZCheckbox';

interface OwnProperties
{
    zCampoRegion:ZCampoModel;
    zcamposEnRegionList:Array<ZCampoModel>
}

import ZCampo from './ZCampo';

export default class ZRegion extends React.Component<OwnProperties, void>
{
    public static defaultProps: Partial<OwnProperties> = {
        zcamposEnRegionList : new Array<ZCampoModel>()
    };

    render(){

        const { zCampoRegion, zcamposEnRegionList } = this.props;
        
        return (            
            <Panel header={zCampoRegion.etq.replace("@R", "")} bsStyle="info">                
                {zcamposEnRegionList.map((zcampoEnRegion:ZCampoModel, index:number) => {
                    return (
                        <Col xs={12} sm={4} md={4} key={index}>
                            <ZCampo zCampoModel={zcampoEnRegion}/>
                        </Col>
                    );
                })}
            </Panel>            
        );
    }
}


