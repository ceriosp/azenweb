import * as redux from 'redux';
import * as React from 'react';

import { connect } from 'react-redux';

import {
    Row,
    Col,
    Glyphicon,
    Navbar,
    Nav,
    MenuItem,
    NavItem,
    NavDropdown
} from 'react-bootstrap';

import * as ZMenu from '../index';

import {
    ZMenuModel,
    ZMenuItemModel,

    State,
    ZMenuState,
    IZMenu,
    IZMenuItem,

} from '../../zcommon';

export interface OwnProps {
    index: number;
    sobrePonerse: boolean;
}

export interface ConnectedState {
    zMenu: IZMenu
}

export interface ConnectedDispatch {
    despacharOpcionMenu: (zmenuItemModel: ZMenuItemModel) => void;
}

import { ZMenuItemContainer } from '../containers/ZMenuItemContainer';

export class ZMenuRoot extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
    }

    render() {

        let { zMenu, index } = this.props;

        return (
            <Row>
                <Col md={12}>
                    <Navbar
                        collapseOnSelect
                        staticTop
                        style={this.props.sobrePonerse ? { zIndex: 1000000 } : null}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">Azen contabilidad</a>
                            </Navbar.Brand>
                            <Navbar.Toggle>
                            </Navbar.Toggle>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                {zMenu.menu.map((zMenuItem: IZMenuItem, i: number) => {
                                    let key: string = zMenuItem.ctx;
                                    return (
                                        <ZMenuItemContainer
                                            key={key}
                                            zmenuItem={zMenuItem}
                                            despacharOpcionMenuFn={this.despacharOpcionMenu}
                                            parentLevel={0} />
                                    );
                                })}

                                <NavItem eventKey={1} href="#">
                                    <Glyphicon glyph="user" /> Usuario: Carlos Ríos
                                    </NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        );
    }

    despacharOpcionMenu(zmenuItemModel: ZMenuItemModel) {
        this.props.despacharOpcionMenu(zmenuItemModel);
    }
}