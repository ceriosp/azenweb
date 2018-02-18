import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Table
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';
import { IZPantex, IZFormaTabla, IZCampo, IZComandoForma, IZFormaTablaState, IZCampoState, ZFilaCamposState, IZFilaCamposState } from "../../zcommon";
import ZCampo from "./ZCampo";

import { Constants } from "../constants";

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedDispatch {
    onFilaMultiSeleccionada:
    (zFormaTablaState: IZFormaTablaState, indexFilaMultiSeleccionada: number) => void;
}

export interface ConnectedState {
}


export class ZFormaTablaMov extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);
    }

    render(): any {

        return (
            <div style={{
                overflowX: "auto"
            }}>
                <Table className="azen-tabla-mov">
                    <thead>
                        <tr>
                            {this.props.zFormaTabla.filasCamposList[0].cmpsState.map((zcampoI: IZCampoState, index: number) => {
                                return (
                                    <th key={index}>
                                        {zcampoI.etq}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.zFormaTabla.filasCamposList.map((zfilaCampoState: IZFilaCamposState, indexFila: number) => {

                            let algunCampoConValor = false;

                            for (let i = 0; i < zfilaCampoState.cmpsState.length; i++) {
                                if (zfilaCampoState.cmpsState[i].value) {
                                    algunCampoConValor = true;
                                    break;
                                }
                            }

                            if (algunCampoConValor) {

                                return (
                                    <tr
                                        key={indexFila}
                                        style={{
                                            backgroundColor: this.props.zFormaTabla.indexFilaMultiSeleccionada == indexFila ? "#D9EDF7" : ""
                                        }}
                                    >
                                        {zfilaCampoState.cmpsState.map((zcampoI: IZCampoState, indexCampo: number) => {
                                            return (
                                                <td key={indexCampo}>
                                                    <ZCampo
                                                        zCampo={zcampoI}
                                                        zFormaTabla={this.props.zFormaTabla}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}