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
    Constants as ZCommonConstants
} from "../../zcommon";
import { setTimeout } from 'timers';

export interface OwnProps {
    zCampoModel: IZCampo;
}

export interface ConnectedState {
}

export interface ConnectedDispatch {
    sincronizarCampo: (buffer: string) => void;
}

interface OwnState {
    hasChanged: boolean;
    value: string;
}

export class ZCampoTextbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, OwnState>
{
    private buffer: string;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.state = {
            hasChanged: false,
            value: ""
        } as OwnState;

        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sincronizarCampo = this.sincronizarCampo.bind(this);
    }

    render() {
        const { zCampoModel } = this.props;
        return (
            <FormGroup controlId={zCampoModel.nomCmp} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zCampoModel.etq}
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            name={zCampoModel.nomCmp}
                            onChange={this.onChange}
                            onBlur={this.handleChange}
                        />
                    </Col>
                </Col>
            </FormGroup>
        );
    }

    handleChange(e: any) {
        if (this.state.hasChanged && this.state.value != e.target.value) {
            this.setState({
                value: e.target.value
            } as OwnState);
            this.sincronizarCampo(e.target);
        }
    }

    onChange(e: any) {
        this.setState({
            hasChanged: true
        } as OwnState);
    }

    sincronizarCampo(target: any) {
        this.buffer = `<nc>${target.name}</nc><vc>${target.value}</vc>`;
        this.props.sincronizarCampo(this.buffer);
    }
}
