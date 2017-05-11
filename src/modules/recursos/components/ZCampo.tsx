import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZCampoText from './ZCampoText';
import ZCampoCheckbox from './ZCampoCheckbox';
import ZCampoRadioGroup from './ZCampoRadioGroup';
import ZCampoCheckboxGroup from './ZCampoCheckboxGroup';

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    index:number;

    esCheckBoxGroup?:boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo
    claseInd:number;
    zcamposModelCheckRadioOptions?:Array<ZCampoModel>;
}

export default class ZCampo extends React.Component<OwnProperties, void>
{
    private claseInd:number = RecursosConstants.CAMPO_TEXTO;

    render(){
        const { zCampoModel, claseInd, esCheckBoxGroup } = this.props;        

        let zCampoComponent = this.getZCampoComponent();
        
        if(claseInd == RecursosConstants.CAMPO_TEXTO){
            zCampoComponent = (
                <div>
                    <Col componentClass={ControlLabel} md={3}>
                        {zCampoModel.etq}
                    </Col>
                    <Col md={9} xs={12}>
                        {zCampoComponent}
                    </Col>                    
                </div>
            );
        }
        else
        {
            zCampoComponent = (
                <div>
                    <Col md={3}></Col>
                    <Col md={9} xs={12}>
                        {zCampoComponent}
                    </Col>                    
                </div>                
            );
        }

        return (
            <FormGroup controlId={zCampoModel.nomCmp} bsSize="small">
                {zCampoComponent}
            </FormGroup>
        );
    }

    getZCampoComponent():any
    {
        const { 
            zCampoModel, 
            claseInd,
            esCheckBoxGroup,
            zcamposModelCheckRadioOptions } = this.props;        

        let zCampoComponent:any = <ZCampoCheckbox zCampoModel={zCampoModel}/>;


        if(claseInd == RecursosConstants.CAMPO_RADIO && !esCheckBoxGroup){            
            return zCampoComponent;
        }

        switch(claseInd)
        {
            case RecursosConstants.CAMPO_TEXTO:
                zCampoComponent = <ZCampoText zCampoModel={zCampoModel}/>;
            break;

            case RecursosConstants.CAMPO_RADIO:
                zCampoComponent = <ZCampoRadioGroup zCampoModel={zCampoModel} zCamposModelRadioOptions={zcamposModelCheckRadioOptions} />;
            break;

            case RecursosConstants.CAMPO_CHECKBOX:
                zCampoComponent = <ZCampoCheckboxGroup zCampoModel={zCampoModel} zCamposModelCheckboxOptions={zcamposModelCheckRadioOptions} />;
            break;
        }

        return zCampoComponent;        
    }    
}