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
    index:number;

    esCheckBoxGroup?:boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo
    claseInd:number;
    zcamposEnGrupoList?:Array<ZCampoModel>;    
}

export default class ZCampo extends React.Component<OwnProperties, void>
{
    private claseInd:number = RecursosConstants.CAMPO_TEXTO;

    render(){
        const { zCampoModel, claseInd, esCheckBoxGroup } = this.props;        

        let zCampoComponent = this.getZCampoComponent();
        
        if(claseInd == RecursosConstants.CAMPO_TEXTO){
            zCampoComponent = (
                <Row>
                    <Col md={3}></Col>
                    <Col md={9} xs={12}>
                        {zCampoComponent}
                    </Col>                    
                </Row>                
            );
        }
        else
        {
            zCampoComponent = (
                <Row>
                    <Col md={3}></Col>
                    <Col md={9} xs={12}>
                        {zCampoComponent}
                    </Col>                    
                </Row>                
            );
        }
        
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
            claseInd,
            esCheckBoxGroup,
            zcamposEnGrupoList } = this.props;


        if(claseInd == RecursosConstants.CAMPO_RADIO && !esCheckBoxGroup){
            return <ZCheckbox zCampoModel={zCampoModel}/>;
        }

        if(claseInd == RecursosConstants.CAMPO_TEXTO && zcamposEnGrupoList.length > 0){            
            return <ZRegion
                        zCampoRegion={zCampoModel} 
                        zcamposModelEnRegionList={zcamposEnGrupoList} />;
        }

        switch(claseInd)
        {
            case RecursosConstants.CAMPO_TEXTO:
                return <ZTextbox zCampoModel={zCampoModel}/>;

            case RecursosConstants.CAMPO_RADIO:
                return <ZRegion 
                            zCampoRegion={zCampoModel} 
                            zcamposModelEnRegionList={zcamposEnGrupoList} />;

            case RecursosConstants.CAMPO_CHECKBOX:
                return <ZRegion 
                            zCampoRegion={zCampoModel} 
                            zcamposModelEnRegionList={zcamposEnGrupoList} />;
        }
    }    
}