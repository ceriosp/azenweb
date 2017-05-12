import * as React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import {
    Recurso
} from "../constants";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    tipoBoton:Recurso.TipoBoton
}

export default class ZButton extends React.Component<OwnProperties, void>
{
    render(){

        const { zCampoModel, tipoBoton } = this.props;        
        let zButtonComponent = null;

        let etq:string = ""; 

        if(tipoBoton == Recurso.TipoBoton.Comando){
            etq = zCampoModel.etq.replace("@@B", "");
        }
        else if(tipoBoton == Recurso.TipoBoton.Linea){
            etq = zCampoModel.etq.replace("@L", "");
        }

        etq = etq.replace("{", "").replace("}", "");

        {            
            (tipoBoton == Recurso.TipoBoton.Comando)
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
