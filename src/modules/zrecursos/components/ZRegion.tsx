import * as React from 'react';

import {
    Col,    
    Panel,
    Checkbox
} from 'react-bootstrap';

import * as ZRecursos from "../../zrecursos";

import {
    ZCampoModel,
    ZRecursoViewModel
} from "../model";

import ZTextbox from './ZTextbox';
import ZRadio from './ZRadio';
import ZCheckbox from './ZCheckbox';

interface OwnProperties
{
    zrecursoViewModel:ZRecursoViewModel;
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

        const { zrecursoViewModel, zCampoRegion, zcamposEnRegionList } = this.props;
        
        return (            
            <Panel header={zCampoRegion.etq.replace("@R", "")} bsStyle="info">                
                {zcamposEnRegionList.map((zcampoEnRegion:ZCampoModel, index:number) => {
                    return (
                        <Col xs={12} sm={4} md={4} key={index}>
                            <ZCampo 
                                zrecursoViewModel={zrecursoViewModel}
                                zcampoModel={zcampoEnRegion}/>
                        </Col>
                    );
                })}
            </Panel>            
        );
    }
}