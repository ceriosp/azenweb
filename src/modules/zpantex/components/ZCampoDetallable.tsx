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
    ZCampoModel,
    IZCampo,
    Constants as ZCommonConstants,
    IZCampoState
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean
}

export interface ConnectedDispatch {
    despacharEventoCliente:(cmd: ZCommonConstants.ComandoEnum, buffer: string) => void;
}

export class ZCampoDetallable extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    disabled:boolean;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {
        const zCampoModel = this.props.zCampoModel;
        this.disabled = this.props.estaProcesandoRequestServidor || zCampoModel.readOnly;
        
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

    onCampoZoomClick() {
        if(this.disabled){
            return;
        }
        this.props.despacharEventoCliente(ZCommonConstants.ComandoEnum.CM_DETALLAR, 
            `<nc>${this.props.zCampoModel.nomCmp}</nc>`);
    }
}
