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
    Recursos
} from "../constants";

import ZTextbox from './ZTextbox';
import ZRadio from './ZRadio';
import ZCheckbox from './ZCheckbox';
import ZRegion from './ZRegion';

interface OwnProperties
{
    zCampoModel:ZCampoModel;    

    esCheckboxAislado?:boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo    
    zcamposEnRegionList?:Array<ZCampoModel>;    
}

export default class ZCampo extends React.Component<OwnProperties, void>
{    
    private isRegion:boolean = false;

    render(){
        const { zCampoModel, esCheckboxAislado } = this.props;        
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
            esCheckboxAislado,
            zcamposEnRegionList } = this.props;

        const claseInd:number = zCampoModel.claseInd;
        const esRegion:boolean = zcamposEnRegionList && zcamposEnRegionList.length > 0;        

        if(esRegion){
            return <ZRegion
                        zCampoRegion={zCampoModel} 
                        zcamposEnRegionList={zcamposEnRegionList} />;
        }
        else if(claseInd == Recursos.Constants.CAMPO_TEXTO){
            return <ZTextbox zCampoModel={zCampoModel}/>;
        }    
        else if(claseInd == Recursos.Constants.CAMPO_RADIO && esCheckboxAislado){
            return <div style={{marginBottom:"10px"}}><ZCheckbox zCampoModel={zCampoModel}/> </div>;
        }            
        else if(claseInd == Recursos.Constants.CAMPO_RADIO){
            return <ZRadio zCampoModel={zCampoModel}/>;
        }
        else if(claseInd == Recursos.Constants.CAMPO_CHECKBOX){
            return <ZCheckbox zCampoModel={zCampoModel}/>;
        }        
    }    
}