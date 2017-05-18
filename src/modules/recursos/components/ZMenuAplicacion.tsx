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

interface OwnProps
{
    despacharOpcionMenuFn:(recurso:string)=>void
}

export default class ZMenuAplicacion extends React.Component<OwnProps, undefined>
{
     constructor(props: OwnProps) {
        super(props);
        console.log("constructor zmenu aplicacion");
     }

    render(){

        return (
                <Row>
                    <Col md={12}>
                        <Navbar collapseOnSelect style={{zIndex:1000000}}>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#">ecBoss IT-ROI web</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>
                                <Nav>
                                    <NavItem eventKey={1} href="#">Ayuda</NavItem>
                                    <NavDropdown eventKey={2} title="Entidades" id="basic-nav-dropdown">
                                        <MenuItem eventKey={2.1} onClick={this.despacharOpcionMenu.bind(this, "#/azenctb/ctbdoc")}>Documento</MenuItem>
                                        <MenuItem eventKey={2.2} onClick={this.despacharOpcionMenu.bind(this, "#/azenctb/ctbter")}>Tercero</MenuItem>
                                        <MenuItem eventKey={2.3} onClick={this.despacharOpcionMenu.bind(this, "#/azenctb/ctbcta")}>Cuenta</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey={2.4}>Ayuda</MenuItem>
                                        <MenuItem divider/>
                                    </NavDropdown>
                                </Nav>
                                <Nav pullRight>
                                    <NavItem eventKey={1} href="#">
                                        <Glyphicon glyph="user" /> Usuario: Carlos Ríos
                                    </NavItem>
                                    <NavItem eventKey={2} href="#"> </NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>   
                    </Col>    
                </Row>
        );
    }

    despacharOpcionMenu(recursoId:string){
        this.props.despacharOpcionMenuFn(recursoId);
    }
}
