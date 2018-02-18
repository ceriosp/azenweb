import * as React from 'react';

import {
    FormGroup,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZFormaTablaState
} from "../../zcommon";
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoModel: IZCampoState;
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    onCampoChanged: (zcampoState: IZCampoState, valor: string) => void;
    onCampoBlur: (zcampoState: IZCampoState) => void;
}

export class ZCampoTextbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    render() {
        const { zCampoModel, zFormaTabla } = this.props;
        if (zFormaTabla.venState.numLinsDatos == 0) {
            return (
                <FormGroup bsSize="small">
                    <Col md={12}>
                        <Col componentClass={ControlLabel}>
                            {zCampoModel.etq}
                        </Col>
                        <Col>
                            <ZCampoTextoBasicoContainer zCampoModel={zCampoModel} />
                        </Col>
                    </Col>
                </FormGroup>
            );
        } else {
            if (zFormaTabla.venState.numLinsDatos > 0) { //Es multi
                return (
                    <FormGroup bsSize="small">
                        <ZCampoTextoBasicoContainer zCampoModel={zCampoModel} />
                    </FormGroup>
                );
            }
        }
    }

    onChange(e: any) {
        this.props.onCampoChanged(this.props.zCampoModel, e.target.value);
    }

    onBlur(e: any) {
        this.props.onCampoBlur(this.props.zCampoModel);
    }
}