import * as React from 'react';

import {
    FormGroup,
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

import { ZLabelCampoContainer } from '../containers/ZLabelCampoContainer';
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

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
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {
        const { zCampoModel, zFormaTabla } = this.props;
        const disabled = this.props.estaProcesandoRequestServidor || zCampoModel.readOnly;

        if (zFormaTabla.venState.numLinsDatos == 0) {
            return (
                <FormGroup bsSize="small">
                    <Col md={12}>
                        <ZLabelCampoContainer zCampoModel={zCampoModel} />
                        <Col>
                            <InputGroup>
                                <ZCampoTextoBasicoContainer zCampoModel={zCampoModel} />
                                <InputGroup.Addon
                                    onClick={this.onCampoZoomClick}
                                    style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
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
                    <FormGroup bsSize="small"
                        style={{
                            marginBottom: "1px"
                        }}
                    >
                        <InputGroup>
                            <ZCampoTextoBasicoContainer zCampoModel={zCampoModel} />
                            <InputGroup.Addon
                                onClick={this.onCampoZoomClick}
                                style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="list" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                );
            }
        }
    }

    onCampoZoomClick() {
        this.props.despacharEventoCliente(ZCommonConstants.ComandoEnum.CM_DETALLAR,
            `<nc>${this.props.zCampoModel.nomCmp}</nc>`);
    }
}
