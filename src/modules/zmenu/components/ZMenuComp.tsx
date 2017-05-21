import * as React from 'react';

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

import {
    ZMenuModel,
    ZMenuItemModel
} from '../model';

interface OwnProps {
    zmenuModel: ZMenuModel
    index: number;
    despacharOpcionMenuFn?: (zmenuItemModel: ZMenuItemModel) => void
}

import ZMenuItem from './ZMenuItem';

export default class ZMenuComp extends React.Component<OwnProps, undefined>
{
    constructor(props: OwnProps) {
        super(props);

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
    }

    render() {

        let { zmenuModel, index } = this.props;

        return (
            <Row>
                <Col md={12}>
                    <Navbar
                        collapseOnSelect
                        staticTop                        
                        style={{ zIndex: 1000000 }}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">Azen contabilidad</a>
                            </Navbar.Brand>
                            <Navbar.Toggle>                                
                            </Navbar.Toggle>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                {zmenuModel.menu.map((zmenuItemModel: ZMenuItemModel, i: number) => {
                                    let key: string = zmenuItemModel.ctx;
                                    return (
                                        <ZMenuItem
                                            key={key}
                                            zmenuItemModel={zmenuItemModel}
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
        if (this.props.despacharOpcionMenuFn) {
            this.props.despacharOpcionMenuFn(zmenuItemModel);
        }
    }
}
