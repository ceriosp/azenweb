import * as React from 'react';

import {
    FormGroup,
    Col,
    ControlLabel,
    InputGroup,
    Button,
    Glyphicon
} from 'react-bootstrap';

{/*
    Ref: https://github.com/YouCanBookMe/react-datetime
*/}
var DateTime = require('react-datetime');

import {
    Constants as ZCommonConstants,
    IZCampoState,
} from "../../zcommon";
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    onCampoChangedEnviarCmd: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoFecha extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.limpiarCampo = this.limpiarCampo.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { zCampoModel } = this.props;
        const disabled = this.props.estaProcesandoRequestServidor || zCampoModel.readOnly;
        const formato = "DD/MM/YYYY";

        return (
            <DateTime
                dateFormat={formato}
                timeFormat={false}
                inputProps={{ title: 'formato ' + formato, disabled: disabled, readOnly: true }}
                closeOnSelect={true}
                onChange={this.onChange}
                renderInput={this.renderInput}
            />
        );
    }

    renderInput(props: any, openCalendar: any, closeCalendar: any) {

        const { zCampoModel } = this.props;
        const fechaConFormato = zCampoModel.value && zCampoModel.value != "00000000"
            ? zCampoModel.value.substring(0, 2) + "/" + zCampoModel.value.substring(2, 4) + "/" + zCampoModel.value.substring(4, 8)
            : "";
            
        const disabled = this.props.estaProcesandoRequestServidor || zCampoModel.readOnly;

        return (
            <FormGroup bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zCampoModel.etq}
                    </Col>
                    <Col>
                        <InputGroup>
                            <ZCampoTextoBasicoContainer
                                zCampoModel={zCampoModel}
                                valor={fechaConFormato}
                                readOnly={true}
                            />
                            {/*
                            <InputGroup.Addon
                                onClick={this.limpiarCampo}
                                title="Borrar fecha"
                                style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="remove-circle" />
                            </InputGroup.Addon>                            
                            */}
                            <InputGroup.Addon
                                onClick={openCalendar}
                                style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
                                <Glyphicon glyph="calendar" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Col>
                </Col>
            </FormGroup>
        );
    }

    onChange(moment: any) {

        if (this.props.zCampoModel.readOnly) {
            return;
        }

        const dia = moment._d.getDate() < 10
            ? "0" + moment._d.getDate().toString()
            : moment._d.getDate();

        const mes = (moment._d.getMonth() + 1) < 10
            ? "0" + (moment._d.getMonth() + 1).toString()
            : (moment._d.getMonth() + 1);

        const valorFecha = dia.toString() + mes.toString() + moment._d.getFullYear().toString();

        this.props.onCampoChangedEnviarCmd(this.props.zCampoModel, valorFecha);
    }

    limpiarCampo() {

        if (this.props.zCampoModel.readOnly) {
            return;
        }

        this.props.onCampoChangedEnviarCmd(this.props.zCampoModel, "");
    }
}