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

interface OwnProps
{
    zmenuModel:ZMenuModel
    index:number;
    despacharOpcionMenuFn?:(recurso:string)=>void
}

import ZMenuItem from './ZMenuItem';

export default class ZMenu extends React.Component<OwnProps, undefined>
{
    render(){

        let { zmenuModel } = this.props;

        return (
                <Row>
                    <Col md={12}>
                        <Navbar collapseOnSelect style={{zIndex:1000000}}>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="#">Azen contabilidad web</a>
                                </Navbar.Brand>
                                <Navbar.Toggle />
                            </Navbar.Header>
                            <Navbar.Collapse>                                
                                <Nav>
                                    {zmenuModel.menu.map((zmenuItemModel:ZMenuItemModel, index:number)=>{
                                        let key:string = zmenuItemModel.ctx + index;
                                        return (
                                            <NavDropdown 
                                                key={key}                                                
                                                title={zmenuItemModel.nom} 
                                                id={"zmenu_" + index}>
                                                <ZMenuItem                                                    
                                                    zmenuItemModel={zmenuItemModel}
                                                    parentIndex={index}/>
                                            </NavDropdown>
                                        );
                                    })}
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
