import * as React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import {
    Recursos
} from "../constants";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    tipoBoton:Recursos.TipoBoton
}

export default class ZButton extends React.Component<OwnProperties, void>
{
    render(){

        const { zCampoModel, tipoBoton } = this.props;        
        let zButtonComponent = null;

        let etq:string = ""; 

        if(tipoBoton == Recursos.TipoBoton.Comando){
            etq = zCampoModel.etq.replace("@@B", "");
        }
        else if(tipoBoton == Recursos.TipoBoton.Linea){
            etq = zCampoModel.etq.replace("@L", "");
        }

        etq = etq.replace("{", "").replace("}", "");

        {            
            (tipoBoton == Recursos.TipoBoton.Comando)
                ?            
                    zButtonComponent = 
                            <Button bsStyle="primary">
                                {etq}
                            </Button>
                :
                    zButtonComponent = 
                            <Button bsStyle="link">
                                {etq}
                            </Button>                                  
        }

        return zButtonComponent;
    }
}