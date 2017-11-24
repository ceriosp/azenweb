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

import { IZPantex, IZFormaTabla } from '../../zcommon';
import { ZRegionContainer } from '../containers/ZRegionContainer';
import { ZLineaEstadoContainer } from '../containers/ZLineaEstadoContainer';
import { ZBarraComandosContainer } from '../containers/ZBarraComandosContainer';
import { Constants } from "../constants";

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
            <h3 id={Constants.PX_PREFIJO_TITLE_ID + this.props.zPantex.zFormaTablaList[0].ven.numPx}>
                {this.props.zPantex.zFormaTablaList[0].ven.descr}
            </h3>
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
                        <div id={Constants.PX_PREFIJO_ID + zFormaTablaI.ven.numPx} key={zFormaTablaI.ven.numPx}>
                            <Panel header={titulo} bsStyle="primary">
                                <ZLineaEstadoContainer
                                    linEst={zFormaTablaI.linEst}
                                />
                                <ZBarraComandosContainer
                                    zComandosList={zFormaTablaI.btns}
                                />
                                <ZRegionContainer
                                    zFormaTabla={zFormaTablaI}
                                    zRegionIndex={index}
                                />
                                <ZBarraComandosContainer
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
