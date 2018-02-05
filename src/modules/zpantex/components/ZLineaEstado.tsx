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
                        let tooltip = (<Tooltip key={index} id={`tooltip_` + index}>{zComandoI.etq + zComandoI.cmd}</Tooltip>);
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
                                    {zComandoI.cmd}
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
        this.props.despacharEventoCliente(cmd);
    }
}