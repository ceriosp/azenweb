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

import * as ZCommon from '../../zcommon';

import * as ZMenu from '../index';

import {
    ZMenuModel,
    ZMenuItemModel,

    State,
    ZMenuState,
    IZMenu,
    IZMenuItem,
    IParametrosActivacionObj
} from '../../zcommon';

export interface OwnProps {
    index: number;
}

export interface ConnectedState {
    zMenu: IZMenu;
    idApl: string;
    username: string;

    parametrosActivacionObj: IParametrosActivacionObj;

    ponerModal: boolean;
    estaProcesandoRequestServidor: boolean;
    tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum
}

export interface ConnectedDispatch {
    despacharOpcionMenu: (zmenuItemModel: ZMenuItemModel) => void;

    activarLogConsola: (nivelLog: number) => void;
}

import { ZMenuItemContainer } from '../containers/ZMenuItemContainer';

export class ZMenuRoot extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
        this.activarLogConsola = this.activarLogConsola.bind(this);
    }

    render() {

        let { zMenu, index, idApl } = this.props;

        return (
            <Navbar
                collapseOnSelect
                staticTop
                style={this.props.ponerModal ||
                    (this.props.tipoAJAXIndicador == ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL && this.props.estaProcesandoRequestServidor)
                    ? null
                    : { zIndex: 1000000 }}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="javascript:void(0);">{idApl}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle></Navbar.Toggle>
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
                    </Nav>
                    {this.props.parametrosActivacionObj.bd && (
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                <Glyphicon glyph="user" /> {this.props.parametrosActivacionObj.usuario}, {this.props.parametrosActivacionObj.uid}
                            </NavItem>
                            <NavItem eventKey={1} href="#">
                                <Glyphicon glyph="calendar" /> {this.props.parametrosActivacionObj.mes}, {this.props.parametrosActivacionObj.anio}
                            </NavItem>
                            <NavItem eventKey={1} href="#" onDoubleClick={this.activarLogConsola}>
                                <Glyphicon glyph="tasks" /> {this.props.parametrosActivacionObj.bd}
                            </NavItem>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    despacharOpcionMenu(zmenuItemModel: ZMenuItemModel) {
        this.props.despacharOpcionMenu(zmenuItemModel);
    }

    activarLogConsola(e: any) {
        this.props.activarLogConsola(1);
    }
}