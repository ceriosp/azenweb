import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampoModel,
    IZCampo,
    Constants as ZCommonConstants,
    IZCampoState
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
    px: number;
    zftIndex: number;
}

export interface ConnectedState {
    estaProcesandoRequestServidor:boolean
}

export interface ConnectedDispatch {
    onCampoChanged: (zcampoState: IZCampoState, valor: string) => void;
    onCampoBlur: (zcampoState: IZCampoState) => void;
}

export class ZCampoTextbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private buffer: string;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {
        const { zCampoModel } = this.props;
        let idCampo = this.props.px.toString() + "_" + this.props.zftIndex.toString() + "_" + zCampoModel.nomCmp;
        return (
            <FormGroup controlId={idCampo} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zCampoModel.etq}
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            name={zCampoModel.nomCmp}
                            value={zCampoModel.value}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                            maxLength={zCampoModel.lon}
                            disabled={this.props.estaProcesandoRequestServidor}
                            style={{
                                borderColor: zCampoModel.haCambiado ? '#337AB7' : ''
                            }}
                        />
                    </Col>
                </Col>
            </FormGroup>
        );
    }

    onChange(e: any) {
        this.props.onCampoChanged(this.props.zCampoModel, e.target.value);
    }

    onBlur(e: any) {
        this.props.onCampoBlur(this.props.zCampoModel);
    }
}
