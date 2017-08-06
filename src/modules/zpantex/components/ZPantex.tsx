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
import { IZPantex, IZFormaTabla } from "../../zcommon";
import { ZFormaTabla } from "./ZFormaTabla";

export interface OwnProps {
    zPantex:IZPantex;
}

export interface ConnectedState {
    pxAlTope:number;
}

export interface ConnectedDispatch
{
    
}

export class ZPantex extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    render(): any {
        return (
            <div
                style={{
                    display:this.props.zPantex.numPx == this.props.pxAlTope ? 'block' : 'none'                    
                }}
            >
                {this.props.zPantex.zFormaTablaList.map((zFormaTablaI:IZFormaTabla)=>{
                    return (
                        <ZFormaTabla
                            key={zFormaTablaI.ven.numPx}
                            zFormaTabla={zFormaTablaI}
                        />
                    );
                })}
            </div>
        );
    }
}
