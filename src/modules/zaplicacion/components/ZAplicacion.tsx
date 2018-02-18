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
import { IZPantex, IZFormaTabla, IZPantexModule, ZPantexState, IZPantexState } from "../../zcommon";
import { ZPantexContainer } from "../../zpantex/containers/ZPantexContainer";

export interface OwnProps {

}

export interface ConnectedState {
    pilaZPantexState: Array<ZPantexState>;
}

export interface ConnectedDispatch {

}

export class ZAplicacion extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private zAplicacionDivElement: HTMLDivElement;

    render(): any {
        console.log("render zaplicacion");
        return (
            <div ref={(div: HTMLDivElement) => { this.zAplicacionDivElement = div; }}>
                {this.props.pilaZPantexState.map((zPantexI: IZPantexState, index: number) => {
                    return (
                        <ZPantexContainer
                            key={index}
                            zPantex={zPantexI}
                            container={this.zAplicacionDivElement}
                        />
                    );
                })}
            </div>
        );
    }
}
