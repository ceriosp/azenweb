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
    Panel
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';
import { IZPantex, IZFormaTabla, IZCampo } from "../../zcommon";
import { ZVentana } from "./ZVentana";
import ZCampo from "./ZCampo";

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

        const titulo = (
            <h3>{this.props.zFormaTabla.ven.descr}</h3>
        );

        return (
            <div
                style={{
                    padding:'10px'
                }}
            >
                <Panel header={titulo} bsStyle="primary">                    
                    <Form horizontal>
                        {this.props.zFormaTabla.cmps.map(this.pintarZCampoEnRecurso.bind(this))}
                    </Form>
                </Panel>
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
