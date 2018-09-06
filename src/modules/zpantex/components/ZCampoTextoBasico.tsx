import * as React from 'react';

import {
    FormControl,
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZFormaTablaState,
} from "../../zcommon";
import * as ReactDOM from 'react-dom';

export interface OwnProps {
    zCampoState: IZCampoState;
    zFormaTabla: IZFormaTablaState;
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
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.darFormatoValorCampoSegunTipo = this.darFormatoValorCampoSegunTipo.bind(this);        
        this.onFocus = this.onFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {

        let { zCampoState, zFormaTabla, valor } = this.props;        
        valor = valor ? valor : zCampoState.value;

        return (
            <FormControl
                type="text"                
                name={zCampoState.nomCmp}
                value={valor}
                title={valor}
                onFocus={this.onFocus}
                onChange={this.onChange}
                onBlur={this.onBlur}
                autoFocus={this.props.zCampoState.autoFocus}
                maxLength={zCampoState.lon}
                readOnly={zCampoState.readOnly || this.props.estaProcesandoRequestServidor}
                disabled={zCampoState.noArrivable || (zCampoState.fi && zFormaTabla.indexFilaMultiSeleccionada != zCampoState.fi)}
                style={{
                    borderColor: zCampoState.haCambiado ? '#337AB7' : '',
                    textAlign: zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DINERO ? 'right' : 'left',                    
                }}
            />
        );
    }

    onFocus(e: any) {
        if (this.props.zCampoState.autoFocus) {
            return;
        }
        this.props.onCampoFocusIrACmp(this.props.zCampoState);
    }

    onChange(e: any) {
        this.darFormatoValorCampoSegunTipo(e);
        this.props.onCampoChanged(this.props.zCampoState, e.target.value);
    }

    darFormatoValorCampoSegunTipo(e: any) {

        let valor = e.target.value;

        if (valor.length == 0) {
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_REAL
            || this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DOBLE) {
            if (isNaN(valor)) {
                e.target.value = "";
            }
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_ENTERO
            || this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_LARGO) {
            if (isNaN(parseInt(valor))) {
                e.target.value = "";
            } else {
                e.target.value = parseInt(valor);
            }
            return;
        }

        if (this.props.zCampoState.tipo == ZCommonConstants.TipoCampoEnum.TIPO_DINERO) {
            if (!isNaN(e.target.value)) {
                e.target.value = new Intl.NumberFormat().format(parseFloat(valor));
            } else {
                if (valor.indexOf(".") != -1) {
                    if (valor.lastIndexOf(".") == (valor.length - 1)) {
                        return;
                    }
                }
                valor = valor.replace(/,/g, "");

                e.target.value = new Intl.NumberFormat().format(parseFloat(valor));
            }
        }
    }

    onBlur(e: any) {
        this.props.onCampoBlur(this.props.zCampoState);
    }
}
