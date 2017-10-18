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
    Panel
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';

import { IZPantex, IZFormaTabla } from "../../zcommon";
import ZLineaEstado from "./ZLineaEstado";
import ZBarraComandos from "./ZBarraComandos";
import { ZRegionContainer } from '../containers/ZRegionContainer';

export interface OwnProps {
    zPantex: IZPantex;
}

export interface ConnectedState {
    pxAlTope: number;
}

export interface ConnectedDispatch {

}

export class ZPantex extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    render(): any {

        const titulo = (
            <h3>{this.props.zPantex.zFormaTablaList[0].ven.descr}</h3>
        );

        return (
            <div
                style={{
                    display: this.props.zPantex.numPx == this.props.pxAlTope ? 'block' : 'none',
                    padding: '10px'
                }}
            >
                {this.props.zPantex.zFormaTablaList.map((zFormaTablaI: IZFormaTabla, index: number) => {
                    return (
                        <div key={zFormaTablaI.ven.numPx}>
                            <Panel header={titulo} bsStyle="primary">
                                <ZLineaEstado
                                    linEst={zFormaTablaI.linEst}
                                />
                                <ZBarraComandos
                                    zComandosList={zFormaTablaI.btns}
                                />
                                <ZRegionContainer
                                    zFormaTabla={zFormaTablaI}
                                    zRegionIndex={index}
                                />
                                <ZBarraComandos
                                    zComandosList={zFormaTablaI.btns}
                                />
                            </Panel>
                        </div>
                    );
                })}
            </div>
        );
    }
}
