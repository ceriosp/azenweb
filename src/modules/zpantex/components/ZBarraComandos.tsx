import * as React from 'react';

import {
    ButtonToolbar,
    Button,
    Well,
    Tooltip,
    OverlayTrigger
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZCampoModel, IZComandoForma
} from "../../zcommon";

import ZCampoButton from './ZCampoButton';

import { Services } from "../services";
import { ZProcesandoNoModalContainer } from "../../zaplicacion/containers/ZProcesandoNoModalContainer";

export interface OwnProperties {
    zComandosList: Array<IZComandoForma>,
}

export interface ConnectedState {

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
                        {zComandosList.map((zComandoI: IZComandoForma, index: number) => {
                            let iconName = zPantexServies.getCMIcon(zComandoI);
                            let tooltip = (<Tooltip key={index} id={`tooltip` + index}>{zComandoI.etq}</Tooltip>);
                            return (
                                <OverlayTrigger key={index} placement="top" overlay={tooltip}>
                                    <Button
                                        key={index}
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
