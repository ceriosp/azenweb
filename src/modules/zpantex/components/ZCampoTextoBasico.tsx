import * as React from 'react';

import {
    FormControl,
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
    valor?: any; //Sobreescribe el valor de zCampoModel.value: caso fechas para pintar con formato
    readOnly?: boolean; //Sobreescribe el valor de zCampoModel.readOnly: caso fechas
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    onCampoChanged: (zcampoState: IZCampoState, valor: string) => void;
    onCampoBlur: (zcampoState: IZCampoState) => void;
}

export class ZCampoTextoBasico extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {
        const { zCampoModel, valor } = this.props;
        return (
            <FormControl
                type="text"
                name={zCampoModel.nomCmp}
                value={valor ? valor : zCampoModel.value}
                onChange={this.onChange}
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

    onChange(e: any) {
        this.props.onCampoChanged(this.props.zCampoModel, e.target.value);
    }

    onBlur(e: any) {
        this.props.onCampoBlur(this.props.zCampoModel);
    }
}
