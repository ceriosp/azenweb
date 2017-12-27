import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Row,
    Col,
    Glyphicon,
    Nav,
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
    Form,
    Panel,
    Modal
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';

import { IZPantex, IZFormaTabla } from '../../zcommon';
import { ZRegionContainer } from '../containers/ZRegionContainer';
import { ZLineaEstadoContainer } from '../containers/ZLineaEstadoContainer';
import { ZBarraComandosContainer } from '../containers/ZBarraComandosContainer';
import { Constants } from "../constants";

export interface OwnProps {
    zPantex: IZPantex;
    container: HTMLDivElement;
}

export interface ConnectedState {
    pxAlTope: number;
    esPxModal: boolean;
}

export interface ConnectedDispatch {

}

export class ZPantex extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    render(): any {

        const titulo = (
            <h3 id={Constants.PX_PREFIJO_TITLE_ID + this.props.zPantex.zFormaTablaList[0].ven.numPx}>
                {this.props.zPantex.zFormaTablaList[0].ven.descr}
            </h3>
        );

        return (
            <div>
                <Modal
                    onHide={function () { }}
                    show={true}
                    //show={this.props.zPantex.numPx == this.props.pxAlTope}
                    container={this.props.container}
                    backdrop={this.props.esPxModal}
                    autoFocus={false}
                    enforceFocus={false}
                    bsSize="large"
                    aria-labelledby="contained-modal-title"
                    style={{
                        top: "50px",
                        visibility: this.props.zPantex.numPx == this.props.pxAlTope ? "visible" : "hidden"
                    }}
                >
                    <Modal.Body
                        style={{
                            padding: "0px"
                        }}
                    >
                        {this.props.zPantex.zFormaTablaList.map((zFormaTablaI: IZFormaTabla, index: number) => {
                            return (
                                <div id={Constants.PX_PREFIJO_ID + zFormaTablaI.ven.numPx} key={zFormaTablaI.ven.numPx}>
                                    <Panel
                                        header={titulo}
                                        bsStyle="primary"
                                        style={{
                                            marginBottom: "0px"
                                        }}
                                    >
                                        <ZLineaEstadoContainer
                                            linEst={zFormaTablaI.linEst}
                                        />
                                        {!this.props.esPxModal && (
                                            <ZBarraComandosContainer
                                                zComandosList={zFormaTablaI.btns}
                                            />
                                        )}
                                        <ZRegionContainer
                                            zFormaTabla={zFormaTablaI}
                                            zRegionIndex={index}
                                            px={this.props.zPantex.numPx}
                                        />
                                        <ZBarraComandosContainer
                                            zComandosList={zFormaTablaI.btns}
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
}
