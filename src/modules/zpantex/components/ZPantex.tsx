import * as React from 'react';

import {
    CSSProperties
} from 'react';

var Modal = require('react-bootstrap-modal');

import {
    Panel,
    Row,
    Col
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';

import { Constants as ZCommonConstants } from "../../zcommon/constants";

import { IZPantex, IZFormaTabla, IZPantexState, IZFormaTablaState } from '../../zcommon';
import { Services as ZCommonServices } from "../../zcommon/services";
import { ZLineaEstadoContainer } from '../containers/ZLineaEstadoContainer';
import { ZBarraComandosContainer } from '../containers/ZBarraComandosContainer';
import { Constants } from "../constants";
import { ZFormaTablaContainer } from '../containers/ZFormaTablaContainer';

export interface OwnProps {
    zPantex: IZPantexState;
    container: HTMLDivElement;
}

export interface ConnectedState {
    pxAlTope: number;
    ultimoComandoEnviado: ZCommonConstants.ComandoEnum,
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
        const tituloHTML = (
            <h3>
                {this.props.zPantex.zFormaTablaListState[0].venState.descr}
            </h3>
        );

        let titulo: any = tituloHTML;

        //console.log("rendering: " + this.props.zPantex.zFormaTablaListState[0].venState.descr);

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
                        {this.props.zPantex.zFormaTablaListState.map((zFormaTablaI: IZFormaTablaState, zftIndex: number) => {

                            if (this.props.zPantex.tipoCmdPantex == ZCommonConstants.ComandoEnum.CM_PXCREARMOV
                                && zFormaTablaI.venState.numLinsDatos > 1) {
                                titulo = undefined;
                            } else {
                                titulo = tituloHTML;
                            }

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

                                        {((zftIndex == 0)) && ( //linea estado encabezado
                                            <ZLineaEstadoContainer
                                                linEst={zFormaTablaI.linEstState}
                                            />
                                        )}
                                    
                                        {((zftIndex == 1)) && ( //linea estado detalle
                                            <Row>
                                                <Col xs={12} sm={6} md={3} smOffset={6} mdOffset={9}>
                                                    <ZLineaEstadoContainer
                                                        linEst={zFormaTablaI.linEstState}
                                                    />
                                                </Col>
                                            </Row>
                                        )}

                                        {(zFormaTablaI.cmpsState && zFormaTablaI.cmpsState.length > 6) && (
                                            <ZBarraComandosContainer
                                                zComandosList={zFormaTablaI.btnsState}
                                            />
                                        )}

                                        <ZFormaTablaContainer
                                            zPantex={this.props.zPantex}
                                            zFormaTabla={zFormaTablaI}
                                            zftIndex={zftIndex}
                                        />

                                        {((this.props.zPantex.zFormaTablaListState.length == 1 || zftIndex != 0)) && (
                                            <div style={{ marginTop: "5px" }}>
                                                <ZBarraComandosContainer
                                                    zComandosList={zFormaTablaI.btnsState}
                                                />
                                            </div>
                                        )}
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
