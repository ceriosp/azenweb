import * as React from 'react';

import {
    Col,
    Panel,
    Checkbox
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZFormaTablaState,
    IParametrosActivacionObj
} from "../../zcommon";
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';


declare const window: any;

export interface OwnProps {
    zCampoModel: IZCampoState;
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {
    parametrosActivacionObj: IParametrosActivacionObj;
}

export interface ConnectedDispatch {
    enviarCmdCambioCmp: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoArchivo extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);    
        this.escucharMensajeArchivoCargado();    
    }

    render() {

        const { zCampoModel, zFormaTabla } = this.props;

        let iframeURL = `${this.props.parametrosActivacionObj.urlIframeCargarArchivo}?rutaArchivo=${zCampoModel.value}`;    

        return (
            <Panel header={zCampoModel.etq} bsStyle="success">
                <iframe src={iframeURL} style={{ border: 0, maxHeight: "65px", width: "100%" }}></iframe>
            </Panel>
        );
    }

    escucharMensajeArchivoCargado() {      
        
        console.log("registra evento");

        let eventMethod = window.addEventListener
            ? "addEventListener"
            : "attachEvent";
        let eventer = window[eventMethod];
        let messageEvent = eventMethod === "attachEvent"
            ? "onmessage"
            : "message";
        eventer(messageEvent, (e:any) => {
            try {
                if (e.origin !== this.props.parametrosActivacionObj.urlIframeCargarArchivo) {
                    console.log("llega evento cliente");
                    this.props.enviarCmdCambioCmp(this.props.zCampoModel, e.data.nombreArchivo);
                }
            }
            catch (e) {
                console.error("error recibiendo evento servidor cargar archivos");
                console.error(e);
            }
        });
    }

    shouldComponentUpdate(nextProps: OwnProps, nextState: ConnectedState) {
        return false;
    }
}