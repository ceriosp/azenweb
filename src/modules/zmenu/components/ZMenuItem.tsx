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
    ZMenuModel,
    ZMenuItemModel
} from '../model';

interface OwnProps {
    zmenuItemModel: ZMenuItemModel
    parentLevel: number;
    menuItemPadre?: ZMenuItemModel,
    despacharOpcionMenuFn?: (zmenuItemModel: ZMenuItemModel) => void
}

interface OwnState {
    isMenuOpen: boolean;
}

export default class ZMenuItem extends React.Component<OwnProps, OwnState>
{
    private opcionesHijasDePrimerNivel: Array<any> = [];

    constructor(props: OwnProps) {

        super(props);

        this.state = {
            isMenuOpen: false
        } as OwnState;

        this.despacharOpcionMenu = this.despacharOpcionMenu.bind(this);
        this.createSubMenu = this.createSubMenu.bind(this);

        console.log("construye zmenu item");
    }

    render(): any {

        let {
            zmenuItemModel,
            menuItemPadre,
            parentLevel
        } = this.props;

        let { isMenuOpen } = this.state;

        let menuStyle = {
            marginLeft: (parentLevel * 10) + "px"
        } as CSSProperties;

        let opcionMenu = <MenuItem
            href="#"
            style={menuStyle}            
            onClick={this.despacharOpcionMenu}>
            {zmenuItemModel.nom}
        </MenuItem>;

        if (this.esMenuContenedor()) {
            this.loadOpcionesHijasDePrimerNivel();
            opcionMenu =
                (
                    <NavDropdown
                        onClick={this.createSubMenu}
                        style={menuStyle}
                        eventKey={2}
                        title={zmenuItemModel.nom}
                        id={"z_menuitem_" + zmenuItemModel.ctx}>
                        {this.opcionesHijasDePrimerNivel}
                    </NavDropdown>
                );
        }

        return (opcionMenu);
    }


    loadOpcionesHijasDePrimerNivel() {

        if (!this.state.isMenuOpen) {
            return;
        }

        let {
            zmenuItemModel,
            menuItemPadre,
            parentLevel
        } = this.props;

        this.opcionesHijasDePrimerNivel = (
            zmenuItemModel.menu.map((zmenuItemModelChild: ZMenuItemModel, index: number) => {
                let key: string = zmenuItemModelChild.ctx;
                return (
                    <ZMenuItem
                        key={key}
                        zmenuItemModel={zmenuItemModelChild}
                        parentLevel={parentLevel + 1}
                        despacharOpcionMenuFn={this.props.despacharOpcionMenuFn}
                    />
                );
            })
        );
    }

    esMenuContenedor() {
        let { zmenuItemModel } = this.props;
        return zmenuItemModel.menu && zmenuItemModel.menu.length > 0;
    }

    createSubMenu() {
        this.setState({
            isMenuOpen: true
        } as OwnState);
    }

    despacharOpcionMenu() {

        document.body.click();// .getElementById("azen-evt-container").click();

        if (this.isMobileDevice()) {
            console.log("is mobile");
            (document.querySelector("button.navbar-toggle") as HTMLElement).click();
        }

        if (this.props.despacharOpcionMenuFn) {
            this.props.despacharOpcionMenuFn(this.props.zmenuItemModel);
        }
    }

    isMobileDevice() {
        return window.innerWidth <= 500;
    }
}
