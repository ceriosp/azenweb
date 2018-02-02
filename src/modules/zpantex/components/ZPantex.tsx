import * as React from 'react';

import {
    CSSProperties
} from 'react';

var Modal = require('react-bootstrap-modal');

import {
    Panel,
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';

import { Constants as ZCommonConstants } from "../../zcommon/constants";

import { IZPantex, IZFormaTabla, IZPantexState, IZFormaTablaState } from '../../zcommon';
import { Services as ZCommonServices } from "../../zcommon/services";
import { ZRegionContainer } from '../containers/ZRegionContainer';
import { ZLineaEstadoContainer } from '../containers/ZLineaEstadoContainer';
import { ZBarraComandosContainer } from '../containers/ZBarraComandosContainer';
import { Constants } from "../constants";

export interface OwnProps {
    zPantex: IZPantexState;
    container: HTMLDivElement;
}

export interface ConnectedState {
    pxAlTope: number;
    ultimoComandoEnviado: ZCommonConstants.ComandoEnum,
    ponerModal: boolean;
}

export interface ConnectedDispatch {
}

export class ZPantex extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private commonServices: ZCommonServices.ZCommonServices;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.commonServices = new ZCommonServices.ZCommonServices();

        //console.log("creando zpantex: " + this.props.zPantex.zFormaTablaList[0].ven.descr);
    }

    render(): any {
        const titulo = (
            <h3>
                {this.props.zPantex.zFormaTablaListState[0].venState.descr}
            </h3>
        );

        console.log("rendering: " + this.props.zPantex.zFormaTablaListState[0].venState.descr);

        return (
            <div>
                <Modal
                    onHide={null}
                    show={true}
                    backdrop="static"
                    aria-labelledby="contained-modal-title-sm"
                    container={this.props.container}
                >
                    <Modal.Body
                        style={{
                            padding: "0px",
                        }}
                    >
                        {this.props.zPantex.zFormaTablaListState.map((zFormaTablaI: IZFormaTablaState, index: number) => {
                            return (
                                <div
                                    key={zFormaTablaI.id}
                                >
                                    <Panel
                                        header={titulo}
                                        bsStyle="primary"
                                        style={{
                                            marginBottom: "0px"
                                        }}
                                    >
                                        <ZLineaEstadoContainer
                                            linEst={zFormaTablaI.linEstState}
                                        />
                                        {!this.props.ponerModal && (
                                            <ZBarraComandosContainer
                                                zComandosList={zFormaTablaI.btnsState}
                                            />
                                        )}
                                        <ZRegionContainer
                                            zFormaTabla={zFormaTablaI}
                                            zRegionIndex={index}
                                            px={this.props.zPantex.id}
                                        />
                                        <ZBarraComandosContainer
                                            zComandosList={zFormaTablaI.btnsState}
                                        />
                                    </Panel>
                                </div>
                            );
                        })}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    shouldComponentUpdate(nextProps: ConnectedState, nextState: any) {
        return this.props.ultimoComandoEnviado == ZCommonConstants.ComandoEnum.CM_CERRAR ||
            this.props.zPantex.id == this.props.pxAlTope;
    }

}
