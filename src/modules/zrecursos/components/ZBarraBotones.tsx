import * as React from 'react';

import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import * as ZRecursos from "../../zrecursos";

import ZButton from './ZButton';

interface OwnProperties
{
    zcamposBotonesComandosList:Array<ZCampoModel>,
    zcamposBotonesLineaList:Array<ZCampoModel>
}

export default class ZBarraBotones extends React.Component<OwnProperties, void>
{
    render(){
        const { zcamposBotonesComandosList, zcamposBotonesLineaList} = this.props;
        return (
            <div className="well">
                <ButtonToolbar>
                    {zcamposBotonesComandosList.map((zcampoBoton:ZCampoModel, index:number)=>{
                        return  <ZButton    key={index} 
                                            zCampoModel={zcampoBoton} 
                                            tipoBoton={ZRecursos.Constants.TipoBoton.Comando}/>
                    })}
                </ButtonToolbar>                
                <ButtonToolbar>
                    {zcamposBotonesLineaList.map((zcampoBoton:ZCampoModel, index:number)=>{
                        return  <ZButton    key={index} 
                                            zCampoModel={zcampoBoton} 
                                            tipoBoton={ZRecursos.Constants.TipoBoton.Linea}/>

                    })}
                </ButtonToolbar>            
            </div>            
        );
    }
}
