import * as React from 'react';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Well,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZCampoModel,
    IZComandoForma
} from "../../zcommon";

import ZCampoButton from './ZCampoButton';

import { Services } from "../services";

export interface OwnProperties {
    linEst: Array<IZComandoForma>
}

export interface ConnectedState {

}

export interface ConnectedDispatch {
    despacharEventoCliente: (cmd: ZCommon.Constants.ComandoEnum) => void;
}

export class ZLineaEstado extends React.PureComponent<OwnProperties & ConnectedState & ConnectedDispatch, undefined>
{

    constructor(props: OwnProperties & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharEventoCliente = this.despacharEventoCliente.bind(this);
    }

    public render(): any {
        const { linEst } = this.props;
        let zPantexServies = new Services.ZRecursoServices();
        return (
            <div
                style={{
                    marginBottom: "10px"
                }}
            >
                <ButtonGroup bsSize="small">
                    {linEst.map((zComandoI: IZComandoForma, index: number) => {
                        let iconName = zPantexServies.getCMIcon(zComandoI);
                        let tooltip = (<Tooltip key={index} id={`tooltip` + index}>{zComandoI.etq}</Tooltip>);
                        return (
                            <OverlayTrigger key={index} placement="top" overlay={tooltip}>
                                <Button
                                    key={index}
                                    bsStyle="info"
                                    disabled={zComandoI.desh == 1}
                                    onClick={() => this.despacharEventoCliente(zComandoI.cmd)}
                                >
                                    {(!iconName) &&
                                        zComandoI.etq
                                    }
                                    <span className={iconName} aria-hidden="true"></span>
                                </Button>
                            </OverlayTrigger>
                        );
                    })}
                </ButtonGroup>
            </div>
        );
    }

    despacharEventoCliente(cmd: ZCommon.Constants.ComandoEnum) {
        if (cmd == ZCommon.Constants.ComandoEnum.CM_PRIMERO ||
            cmd == ZCommon.Constants.ComandoEnum.CM_ANTREG ||
            cmd == ZCommon.Constants.ComandoEnum.CM_SGTEREG ||
            cmd == ZCommon.Constants.ComandoEnum.CM_ULTIMO ||
            cmd == ZCommon.Constants.ComandoEnum.CM_ADICIONAR ||
            cmd == ZCommon.Constants.ComandoEnum.CM_MODIFICAR ||
            cmd == ZCommon.Constants.ComandoEnum.CM_CERRAR) {
            this.props.despacharEventoCliente(cmd);
        }
    }
}