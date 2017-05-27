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

} from '../../zcommon';

interface OwnProps {
    index: number;
    solaparse:boolean;
}

interface ConnectedState {
    zmenuModel:ZMenuModel
}
const mapStateToProps = (state:State, ownProps:OwnProps) : ConnectedState => ({
    zmenuModel:ZMenu.selectors.zmenuModelSelector(state.zmenuState),
});

interface ConnectedDispatch
{
    despacharOpcionMenu: (zmenuItemModel: ZMenuItemModel) => void;
}
const mapDispatchToProps = (dispatch: redux.Dispatch<ZMenuState>): ConnectedDispatch => ({
  despacharOpcionMenu:(zmenuItemModel: ZMenuItemModel) => dispatch(ZMenu .Actions.despacharOpcionMenu(zmenuItemModel))
});

import ZMenuItem from './ZMenuItem';

class ZMenuRootComponent extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props:OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
    }

    render() {

        let { zmenuModel, index } = this.props;

        console.log("sobreponerse-menu: " + this.props.solaparse);

        return (
            <Row>
                <Col md={12}>
                    <Navbar
                        collapseOnSelect
                        staticTop                        
                        style={ this.props.solaparse ? { zIndex: 1000000 } : null}>
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
        this.props.despacharOpcionMenu(zmenuItemModel);
    }
}

export const ZMenuRoot: React.ComponentClass<OwnProps> = 
connect<ConnectedState, ConnectedDispatch, OwnProps>(mapStateToProps, mapDispatchToProps)(ZMenuRootComponent);
