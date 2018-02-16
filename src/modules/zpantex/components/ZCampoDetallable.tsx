import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel,
    InputGroup,
    Button,
    Glyphicon
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZFormaTablaState
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean
}

export interface ConnectedDispatch {
    despacharEventoCliente: (cmd: ZCommonConstants.ComandoEnum, buffer: string) => void;
}

export class ZCampoDetallable extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    disabled: boolean;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {
        const { zCampoModel, zFormaTabla } = this.props;
        this.disabled = this.props.estaProcesandoRequestServidor || zCampoModel.readOnly;

        if (zFormaTabla.venState.numLinsDatos == 0) {
            return (
                <FormGroup bsSize="small">
                    <Col md={12}>
                        <Col componentClass={ControlLabel}>
                            {zCampoModel.etq}
                        </Col>
                        <Col>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name={zCampoModel.nomCmp}
                                    value={zCampoModel.value}
                                    maxLength={zCampoModel.lon}
                                    disabled={this.disabled}
                                />
                                <InputGroup.Addon
                                    onClick={this.onCampoZoomClick}
                                    style={{ cursor: this.disabled ? "not-allowed" : "pointer" }}>
                                    <Glyphicon glyph="list" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </Col>
                    </Col>
                </FormGroup>
            );
        }
        else {
            if (zFormaTabla.venState.numLinsDatos > 0) { //Es multi
                return (
                    <FormGroup bsSize="small">
                        <InputGroup>
                            <FormControl
                                type="text"
                                name={zCampoModel.nomCmp}
                                value={zCampoModel.value}
                                maxLength={zCampoModel.lon}
                                disabled={this.disabled}
                            />
                            <InputGroup.Addon
                                onClick={this.onCampoZoomClick}
                                style={{ cursor: this.disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="list" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                );
            }
        }
    }

    onCampoZoomClick() {
        /*
        if(this.disabled){
            return;
        }
        */
        this.props.despacharEventoCliente(ZCommonConstants.ComandoEnum.CM_DETALLAR,
            `<nc>${this.props.zCampoModel.nomCmp}</nc>`);
    }
}
