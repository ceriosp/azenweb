import * as React from 'react';

import {
    Button
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import * as ZRecursos from "../../zrecursos";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    tipoBoton: ZRecursos.Constants.TipoBoton
}

export default class ZButton extends React.Component<OwnProperties, void>
{
    render(){

        const { zCampoModel, tipoBoton } = this.props;        
        let zButtonComponent = null;

        let etq:string = ""; 

        if(tipoBoton == ZRecursos.Constants.TipoBoton.Comando){
            etq = zCampoModel.etq.replace("@@B", "");
        }
        else if(tipoBoton == ZRecursos.Constants.TipoBoton.Linea){
            etq = zCampoModel.etq.replace("@L", "");
        }

        etq = etq.replace("{", "").replace("}", "");

        {            
            (tipoBoton == ZRecursos.Constants.TipoBoton.Comando)
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