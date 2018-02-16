import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Table
} from 'react-bootstrap';

import { Constants } from "../constants";

import {
    Constants as ZCommonConstants
} from '../../zcommon/constants';

import {
    IZMenuItem,
    IZMenu,
} from '../../zcommon/contracts';
import { IZPantex, IZFormaTabla, IZCampo, IZComandoForma, IZFormaTablaState, IZCampoState, ZFilaCamposState, IZFilaCamposState, IZPantexState } from "../../zcommon";
import ZCampo from "./ZCampo";

import { ZFormaTablaZoomContainer } from '../containers/ZFormaTablaZoomContainer';
import { ZFormaTablaMovContainer } from '../containers/ZFormaTablaMovContainer';

export interface OwnProps {
    zPantex: IZPantexState;
    zFormaTabla: IZFormaTablaState;
    zftIndex: number;
}

export interface ConnectedDispatch {
    onFilaMultiSeleccionada:
    (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) => void;
}

export interface ConnectedState {
}


export class ZFormaTabla extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.onFilaClick = this.onFilaClick.bind(this);
    }

    render(): any {

        return (
            <div>

                {/*NO Es multi*/}
                {((this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREAR
                    || this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMENSAJE)
                    || (
                        this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV
                        && this.props.zFormaTabla.venState.numLinsDatos == 0
                    )
                )
                    && this.props.zFormaTabla.cmpsState.map((zcampoAPintar: IZCampoState, index: number) => {
                        return (
                            <Form
                                horizontal
                                key={zcampoAPintar.id}
                            >
                                <Col
                                    md={4}
                                >
                                    <ZCampo
                                        zFormaTabla={this.props.zFormaTabla}
                                        zCampo={zcampoAPintar}
                                    />
                                </Col>
                            </Form>
                        );
                    })}

                {/*Es multi ZOOM*/}
                {(this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARZOOM
                    && this.props.zFormaTabla.filasCamposList) &&
                    (<ZFormaTablaZoomContainer
                        zFormaTabla={this.props.zFormaTabla}
                    />)
                }

                {/*Es multi MOVIMIENTO*/}
                {(this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV
                    && this.props.zFormaTabla.filasCamposList
                    && this.props.zFormaTabla.venState.numLinsDatos > 0
                ) &&
                    (<ZFormaTablaMovContainer
                        zFormaTabla={this.props.zFormaTabla}
                    />)
                }

                <div style={{ clear: 'both' }}> </div>
            </div>
        );
    }


    onFilaClick(indexFila: number) {

        if (indexFila == this.props.zFormaTabla.indexFilaMultiSeleccionada) {
            return;
        }

        this.props.onFilaMultiSeleccionada(this.props.zFormaTabla, indexFila);
    }
}