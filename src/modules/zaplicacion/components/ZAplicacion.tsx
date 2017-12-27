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
import { IZPantex, IZFormaTabla, IZPantexModule } from "../../zcommon";
import { ZPantexContainer } from "../../zpantex/containers/ZPantexContainer";

export interface OwnProps {

}

export interface ConnectedState {
    zPantexModule:IZPantexModule;
}

export interface ConnectedDispatch
{
    
}

export class ZAplicacion extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private divZAplicacion:HTMLDivElement;

    render(): any {
        return (
            <div ref={(div:HTMLDivElement)=>{
                this.divZAplicacion = div;
            }}>
                {this.props.zPantexModule.pilaPantex.map((zPantexI:IZPantex, index:number)=>{                    
                    return (
                        <ZPantexContainer
                            key={index}
                            zPantex={zPantexI}
                            container={this.divZAplicacion}
                        />
                    );
                })}
            </div>
        );
    }
}
