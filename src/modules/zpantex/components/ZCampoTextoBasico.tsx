import * as React from 'react';

import {
    FormControl,
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
} from "../../zcommon";
import * as ReactDOM from 'react-dom';

export interface OwnProps {
    zCampoModel: IZCampoState;
    valor?: any; //Sobreescribe el valor de zCampoModel.value: caso fechas para pintar con formato
    readOnly?: boolean; //Sobreescribe el valor de zCampoModel.readOnly: caso fechas
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    onCampoFocusIrACmp: (zcampoState: IZCampoState) => void;
    onCampoBlur: (zcampoState: IZCampoState) => void;
    onCampoChanged: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoTextoBasico extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    input: any;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {
        const { zCampoModel, valor } = this.props;

        return (
            <FormControl
                type="text"
                ref="inputNode"
                name={zCampoModel.nomCmp}
                value={valor ? valor : zCampoModel.value}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}                
                maxLength={zCampoModel.lon}
                readOnly={this.props.readOnly}
                disabled={
                    this.props.estaProcesandoRequestServidor
                    || zCampoModel.readOnly
                }
                style={{
                    borderColor: zCampoModel.haCambiado ? '#337AB7' : ''
                }}
            />
        );
    }

    onFocus(e: any) {
        if(this.props.zCampoModel.autoFocus){
            return;
        }        
        this.props.onCampoFocusIrACmp(this.props.zCampoModel);
    }

    onChange(e: any) {
        this.props.onCampoChanged(this.props.zCampoModel, e.target.value);
    }

    onBlur(e: any) {
        this.props.onCampoBlur(this.props.zCampoModel);
    }

    componentDidUpdate() {
        let node:any = ReactDOM.findDOMNode(this.refs.inputNode);
        if (this.props.zCampoModel.autoFocus) {            
            node.focus();
            let value = node.value;
            node.value = "";
            node.value = value;
        }
    }
}
