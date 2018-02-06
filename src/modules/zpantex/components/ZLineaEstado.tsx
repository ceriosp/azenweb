import * as React from 'react';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Well,
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {    
    IZComandoFormaState
} from "../../zcommon";

import { Services } from "../services";

export interface OwnProperties {
    linEst: Array<IZComandoFormaState>
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
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
                    {linEst.map((zComandoI: IZComandoFormaState, index: number) => {
                        const iconName = zPantexServies.getCMIcon(zComandoI);
                        return (
                            <Button
                                key={zComandoI.id}
                                bsStyle="info"                                
                                title={zComandoI.etq}
                                disabled={this.props.estaProcesandoRequestServidor || zComandoI.desh == 1}
                                onClick={() => this.despacharEventoCliente(zComandoI.cmd)}
                            >
                                {(!iconName) &&
                                    zComandoI.etq
                                }
                                <span className={iconName} aria-hidden="true"></span>
                            </Button>
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