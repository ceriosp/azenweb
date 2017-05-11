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

                    let zCampoComponent = null;

                    switch(zcampoEnRegion.claseInd){

                        case RecursosConstants.CAMPO_TEXTO:
                            zCampoComponent = <ZTextbox zCampoModel={zcampoEnRegion}/>;
                        break;

                        case RecursosConstants.CAMPO_RADIO:
                            zCampoComponent = <ZRadio zCampoModel={zcampoEnRegion}/>;
                        break;

                        case RecursosConstants.CAMPO_CHECKBOX:
                            zCampoComponent = <ZCheckbox zCampoModel={zcampoEnRegion}/>;
                        break;                                                

                        default:
                            zCampoComponent = <ZTextbox zCampoModel={zcampoEnRegion}/>;
                    }

                    return (
                        <Col xs={12} sm={4} md={3} key={index}>
                            {zCampoComponent}
                        </Col>
                    );
                })}
            </Panel>            
        );
    }
}


