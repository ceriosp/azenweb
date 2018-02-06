import * as React from 'react';

import {
    ButtonToolbar,
    Button,
    Well,
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    IZComandoFormaState
} from "../../zcommon";

import { Services } from "../services";
import { ZProcesandoNoModalContainer } from "../../zaplicacion/containers/ZProcesandoNoModalContainer";

export interface OwnProperties {
    zComandosList: Array<IZComandoFormaState>,
}

export interface ConnectedState {
    estaProcesandoRequestServidor: boolean;
}

export interface ConnectedDispatch {
    despacharEventoCliente: (cmd: ZCommon.Constants.ComandoEnum) => void;
}

export class ZBarraComandos extends React.PureComponent<OwnProperties & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProperties & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharEventoCliente = this.despacharEventoCliente.bind(this);
    }

    public render(): any {
        const { zComandosList } = this.props;
        let zPantexServies = new Services.ZRecursoServices();
        return (
            <Well bsSize="small">
                <div className="zaplicacion-zprocesando-no-modal-loader">
                    <ButtonToolbar>
                        {zComandosList.map((zComandoI: IZComandoFormaState, index: number) => {
                            let iconName = zPantexServies.getCMIcon(zComandoI);
                            return (
                                <Button
                                    key={zComandoI.id}
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
                    </ButtonToolbar>
                    <ZProcesandoNoModalContainer />
                </div>
            </Well>
        );
    }

    despacharEventoCliente(cmd: ZCommon.Constants.ComandoEnum) {
        this.props.despacharEventoCliente(cmd);
    }
}
