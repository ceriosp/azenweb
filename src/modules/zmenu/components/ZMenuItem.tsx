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
    zmenuItemModel:ZMenuItemModel
    parentIndex:number;
    despacharOpcionMenuFn?:(recurso:string)=>void
}


export default class ZMenuItem extends React.Component<OwnProps, undefined>
{
    render(){

        let { zmenuItemModel, parentIndex } = this.props;

        let subMenuItems = <NavItem href="#"></NavItem>;

        if(zmenuItemModel.menu && zmenuItemModel.menu.length > 0){
            subMenuItems = (
                <NavDropdown eventKey={2} title="Entidades" id={"z_menuitem_" + parentIndex}>
                    {zmenuItemModel.menu.map((zmenuItemModel:ZMenuItemModel, index:number)=>{
                        let key:string = zmenuItemModel.ctx + parentIndex + index;
                        return (
                            <ZMenuItem 
                                key={key} 
                                zmenuItemModel={zmenuItemModel}
                                parentIndex={index}>{zmenuItemModel.desc}</ZMenuItem>
                        );
                    })}
                </NavDropdown>
            );
        }        
        
        let menu = subMenuItems

        return (
                <Nav>
                     <NavItem href="#">{zmenuItemModel.nom}</NavItem>
                     {subMenuItems}
                </Nav>
        );
    }

    despacharOpcionMenu(recursoId:string){
        this.props.despacharOpcionMenuFn(recursoId);
    }
}
