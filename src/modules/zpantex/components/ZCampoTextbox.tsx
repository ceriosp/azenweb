import * as React from 'react';

import {
    FormGroup,
    Col,
    ControlLabel,
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

}

export interface ConnectedDispatch {

}

export class ZCampoTextbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
    }

    render() {
        const { zCampoModel, zFormaTabla } = this.props;
        if (zCampoModel.esFijo || zFormaTabla.venState.numLinsDatos == 0) { //Es fijo o NO es de un multi
            return (
                <FormGroup bsSize="small">
                    <Col md={12}>
                        <ZLabelCampoContainer zCampoModel={zCampoModel} />
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
}