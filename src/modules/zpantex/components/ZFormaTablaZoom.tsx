import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Table,
    Glyphicon
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';
import { IZPantex, IZFormaTabla, IZCampo, IZComandoForma, IZFormaTablaState, IZCampoState, ZFilaCamposState, IZFilaCamposState } from "../../zcommon";
import ZCampo from "./ZCampo";

import { Constants } from "../constants";
import ReactDOM = require('react-dom');

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedDispatch {
    onFilaMultiSeleccionada:
    (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) => void;
    onCampoFocusIrACmp: (zcampoState: IZCampoState) => void;
}

export interface ConnectedState {
}


export class ZFormaTablaZoom extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{

    private primeraFilaSeleccionada:boolean = false;

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.onFilaClick = this.onFilaClick.bind(this);
        this.onCampoTituloClick = this.onCampoTituloClick.bind(this);
    }

    render(): any {
        return (
            <Table striped condensed hover responsive>
                <thead>
                    <tr>
                        {this.props.zFormaTabla.filasCamposList[0].cmpsState.map((zcampoI: IZCampoState, index: number) => {
                            return (
                                <th
                                    key={index}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => this.onCampoTituloClick(zcampoI)}
                                >
                                    {(zcampoI.autoFocus) &&
                                        <span>
                                            <Glyphicon style={{ color: "rgb(51, 122, 183)" }} glyph="search" /> &nbsp;
                                        </span>
                                    }
                                    {zcampoI.etq}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.zFormaTabla.filasCamposList.map((zfilaCampoState: IZFilaCamposState, indexFila: number) => {
                        if (indexFila < this.props.zFormaTabla.numFilasVisiblesMulti) {
                            return (
                                <tr
                                    key={indexFila}
                                    style={{
                                        backgroundColor: this.props.zFormaTabla.indexFilaMultiSeleccionada == indexFila ? "#D9EDF7" : ""
                                    }}
                                >
                                    {zfilaCampoState.cmpsState.map((zcampoI: IZCampoState, indexCampo: number) => {
                                        return (
                                            <td
                                                key={indexCampo}
                                                onClick={() => this.onFilaClick(indexFila, this.props.zFormaTabla.filasCamposList[0].cmpsState[indexCampo])}

                                                ref={(ref)=>{                                        
                                                    if(ref && indexFila == 0 && indexCampo == 0){                                                        
                                                        if(!this.primeraFilaSeleccionada){
                                                            this.primeraFilaSeleccionada = true;
                                                            ref.click();
                                                        }                                                        
                                                    }
                                                }}                                  
                                                            
                                            >
                                                {zcampoI.value}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </Table>
        );
    }

    onCampoTituloClick(zcampoI: IZCampoState) {
        this.props.onCampoFocusIrACmp(zcampoI);
    }


    onFilaClick(indexFila: number, zcampoI: IZCampoState) {

        this.props.onCampoFocusIrACmp(zcampoI);

        if (indexFila == this.props.zFormaTabla.indexFilaMultiSeleccionada) {
            return;
        }

        this.props.onFilaMultiSeleccionada(this.props.zFormaTabla, indexFila);
    }
}