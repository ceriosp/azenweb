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
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';
import { IZPantex, IZVentana } from "../../zcommon";

export interface OwnProps {
    zVentana:IZVentana;
}

export interface ConnectedState {
    
}

export interface ConnectedDispatch
{
    
}

export class ZVentana extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    render(): any {
        return (
            <div>
                {this.props.zVentana.descr}
            </div>
        );
    }
}
