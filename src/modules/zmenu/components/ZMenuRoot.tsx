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
    IZMenuItem
} from '../../zcommon';

export interface OwnProps {
    index: number;
}

export interface ConnectedState {
    zMenu: IZMenu;
    idApl: string;
    username: string;

    parametrosActivacion: string;

    ponerModal: boolean;
    estaProcesandoRequestServidor: boolean;
    tipoAJAXIndicador: ZCommon.Constants.TipoAJAXIndicadorEnum
}

export interface ConnectedDispatch {
    despacharOpcionMenu: (zmenuItemModel: ZMenuItemModel) => void;

    activarLogConsola: (nivelLog:number) => void;
}

import { ZMenuItemContainer } from '../containers/ZMenuItemContainer';

export class ZMenuRoot extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    parametrosActivacionComp: Array<string>;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.parametrosActivacionComp = [];

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
                    <Navbar.Brand> <a href="javascript:void(0);">{idApl}</a> </Navbar.Brand>
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
                    {this.parametrosActivacionComp.length > 1 && (
                        <Nav>
                            <NavItem eventKey={1} href="#">
                                <Glyphicon glyph="user" /> {this.parametrosActivacionComp[3]}, {this.parametrosActivacionComp[4]}
                            </NavItem>
                            <NavItem eventKey={1} href="#">
                                <Glyphicon glyph="calendar" /> {this.parametrosActivacionComp[0]}, {this.parametrosActivacionComp[1]}
                            </NavItem>
                            <NavItem eventKey={1} href="#" onDoubleClick={this.activarLogConsola}>
                                <Glyphicon glyph="tasks" /> {this.parametrosActivacionComp[2]}
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

    componentWillReceiveProps(nextProps: ConnectedState) {
        if (nextProps.parametrosActivacion) {
            this.parametrosActivacionComp = nextProps.parametrosActivacion.split(":");
        }
    }

    activarLogConsola(e:any){
        this.props.activarLogConsola(1);
    }
}