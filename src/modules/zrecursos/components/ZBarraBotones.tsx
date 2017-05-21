import * as React from 'react';

import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';

import {
    ZCampoModel
} from "../model";

import {
    Recursos
} from "../constants";

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
            <div>
                <ButtonToolbar>
                    {zcamposBotonesComandosList.map((zcampoBoton:ZCampoModel, index:number)=>{
                        return  <ZButton    key={index} 
                                            zCampoModel={zcampoBoton} 
                                            tipoBoton={Recursos.TipoBoton.Comando}/>
                    })}
                </ButtonToolbar>
                <hr style={{margin:"5px"}}/>
                <ButtonToolbar>
                    {zcamposBotonesLineaList.map((zcampoBoton:ZCampoModel, index:number)=>{
                        return  <ZButton    key={index} 
                                            zCampoModel={zcampoBoton} 
                                            tipoBoton={Recursos.TipoBoton.Linea}/>

                    })}
                </ButtonToolbar>            
            </div>            
        );
    }
}
