import * as React from 'react';

require('moment/locale/es');

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
    IParametrosActivacionObj,
    IZFormaTablaState,
} from "../../zcommon";
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoModel: IZCampoState;
    zFormaTabla: IZFormaTablaState;
    tipoCmdPantex: ZCommonConstants.ComandoEnum;
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
    parametrosActivacionObj: IParametrosActivacionObj;
}

export interface ConnectedDispatch {
    onCampoChangedEnviarCmd: (zcampoState: IZCampoState, valor: string) => void;
}

export class ZCampoFecha extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{

    fecha: Date;
    formato: string = "DD/MM/YYYY";

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.fecha = this.props.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV && this.props.zFormaTabla.rg == 1 
        ? new Date(this.props.parametrosActivacionObj.anio, this.props.parametrosActivacionObj.numeroMes-2)
        : new Date();

        this.limpiarCampo = this.limpiarCampo.bind(this);
        this.renderFecha = this.renderFecha.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {        
        const disabled = this.props.estaProcesandoRequestServidor || this.props.zCampoModel.readOnly;
        return (
            <DateTime
                dateFormat={this.formato}
                timeFormat={false}
                inputProps={{ title: 'formato ' + this.formato, disabled: disabled, readOnly: true }}
                closeOnSelect={true}
                viewDate={this.fecha}
                onChange={this.onChange}
                renderInput={this.renderFecha}
            />
        );
    }

    renderFecha(props: any, openCalendar: any, closeCalendar: any) {

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