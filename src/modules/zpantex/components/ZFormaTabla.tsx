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
import { Services as ZCommonServices } from "../../zcommon/services";
import { IZPantex, IZFormaTabla, IZCampo, IZComandoForma, IZFormaTablaState, IZCampoState } from "../../zcommon";
import { ZVentana } from "./ZVentana";
import ZCampo from "./ZCampo";

import { Constants } from "../constants";

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
    zFormaIndex: number;
    px: number;
}

export interface ConnectedDispatch {
}

export interface ConnectedState {
}


export class ZFormaTabla extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{
    private commonServices: ZCommonServices.ZCommonServices;

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.commonServices = new ZCommonServices.ZCommonServices();
    }

    render(): any {

        return (
            <div>
                <Form
                    horizontal
                    id={this.commonServices.getZFormaTablaId(this.props.px, this.props.zFormaIndex, false)}
                >
                    {this.props.zFormaTabla.cmpsState.map((zcampoAPintar: IZCampoState, index: number) => {
                        return (
                            <Col
                                key={zcampoAPintar.id}
                                md={4}
                            >
                                <ZCampo
                                    zFormaTabla={this.props.zFormaTabla}
                                    zCampo={zcampoAPintar}                                    
                                    px={this.props.px}
                                    zftIndex={this.props.zFormaIndex}
                                />
                            </Col>
                        );
                    })}
                </Form>
                <div
                    style={{
                        clear: 'both'
                    }}
                >
                </div>
            </div>
        );
    }
}