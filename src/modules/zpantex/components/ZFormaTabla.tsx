import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Row,
    Col,
    Glyphicon,
    Navbar,
    Nav,
    MenuItem,
    NavItem,
    NavDropdown,
    Form,
    Panel,
    ButtonToolbar,
    Button
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';
import { IZPantex, IZFormaTabla, IZCampo, IZComandoForma } from "../../zcommon";
import { ZVentana } from "./ZVentana";
import ZCampo from "./ZCampo";
import ZBarraComandos from "./ZBarraComandos";

export interface OwnProps {
    zFormaTabla: IZFormaTabla;
}

export interface ConnectedState {

}

export interface ConnectedDispatch {

}

export class ZFormaTabla extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    render(): any {

        return (
            <div>
                <div>
                    {this.props.zFormaTabla.cmps.map(this.pintarZCampoEnRecurso.bind(this))}
                </div>
                <div 
                    style={{
                        clear: 'both'
                    }}
                >
                </div>
            </div>
        );
    }

    pintarZCampoEnRecurso(zcampoAPintar: IZCampo, index: number) {
        return (
            <Col key={index} md={4}>
                <ZCampo
                    key={index}
                    zFormaTabla={this.props.zFormaTabla}
                    zCampo={zcampoAPintar}
                />
            </Col>
        );
    }

}
