import * as React from 'react';

import {
    Button
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZCampoModel
} from "../../zcommon";

interface OwnProperties
{
    zCampoModel:ZCampoModel;
    tipoBoton: ZCommon.Constants.TipoBoton
}

export default class ZCampoButton extends React.PureComponent<OwnProperties, undefined>
{
    render(){

        const { zCampoModel, tipoBoton } = this.props;        
        let zButtonComponent = null;

        let etq:string = ""; 

        if(tipoBoton == ZCommon.Constants.TipoBoton.Comando){
            etq = zCampoModel.etq.replace("@@B", "");
        }
        else if(tipoBoton == ZCommon.Constants.TipoBoton.Linea){
            etq = zCampoModel.etq.replace("@L", "");
        }

        etq = etq.replace("{", "").replace("}", "");

        {            
            (tipoBoton == ZCommon.Constants.TipoBoton.Comando)
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