import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Row,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZTextbox from './ZTextbox';
import ZCheckbox from './ZCheckbox';
import ZRegion from './ZRegion';

interface OwnProperties
{
    zCampoModel:ZCampoModel;    

    esCheckBoxGroup?:boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo    
    zcamposEnRegionList?:Array<ZCampoModel>;    
}

export default class ZCampo extends React.Component<OwnProperties, void>
{
    private claseInd:number = RecursosConstants.CAMPO_TEXTO;

    render(){
        const { zCampoModel, esCheckBoxGroup } = this.props;        
        const claseInd:number = zCampoModel.claseInd;

        let zCampoComponent = this.getZCampoComponent();
        
        return (
                <div>
                    {zCampoComponent}
                </div>            
        );
    }

    getZCampoComponent():any
    {
        const { 
            zCampoModel, 
            esCheckBoxGroup,
            zcamposEnRegionList } = this.props;

        const claseInd:number = zCampoModel.claseInd;

        if(claseInd == RecursosConstants.CAMPO_RADIO && !esCheckBoxGroup){
            return <ZCheckbox zCampoModel={zCampoModel}/>;
        }

        if(claseInd == RecursosConstants.CAMPO_TEXTO && zcamposEnRegionList.length > 0){            
            return <ZRegion
                        zCampoRegion={zCampoModel} 
                        zcamposEnRegionList={zcamposEnRegionList} />;
        }

        switch(claseInd)
        {
            case RecursosConstants.CAMPO_TEXTO:
                return <ZTextbox zCampoModel={zCampoModel}/>;

            case RecursosConstants.CAMPO_RADIO:
                return <ZRegion 
                            zCampoRegion={zCampoModel} 
                            zcamposEnRegionList={zcamposEnRegionList} />;

            case RecursosConstants.CAMPO_CHECKBOX:
                return <ZRegion 
                            zCampoRegion={zCampoModel} 
                            zcamposEnRegionList={zcamposEnRegionList} />;
        }
    }    
}