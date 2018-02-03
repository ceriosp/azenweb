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
import { Services as ZCommonServices } from "../../zcommon/services";
import { IZPantex, IZFormaTabla, IZCampo, IZComandoForma, IZFormaTablaState, IZCampoState, ZFilaCamposState, IZFilaCamposState } from "../../zcommon";
import { ZVentana } from "./ZVentana";
import ZCampo from "./ZCampo";

import { Constants } from "../constants";

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
    zFormaIndex: number;
    px: number;
}

export interface ConnectedDispatch {
}

export interface ConnectedState {
}


export class ZFormaTabla extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{
    private commonServices: ZCommonServices.ZCommonServices;

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.commonServices = new ZCommonServices.ZCommonServices();
    }

    render(): any {

        return (
            <div>

                {/*NO Es multi*/}
                {this.props.zFormaTabla.cmpsState && this.props.zFormaTabla.cmpsState.map((zcampoAPintar: IZCampoState, index: number) => {
                    return (
                        <Form
                            horizontal
                            key={zcampoAPintar.id}
                        >
                            <Col
                                md={4}
                            >
                                <ZCampo
                                    zFormaTabla={this.props.zFormaTabla}
                                    zCampo={zcampoAPintar}
                                />
                            </Col>
                        </Form>
                    );
                })}

                {/*Es multi*/}
                {this.props.zFormaTabla.filasCamposList &&
                    (<Table striped condensed hover responsive cellPadding="0" cellSpacing="0" className="azen-multi">
                        <tbody>
                            {this.props.zFormaTabla.filasCamposList.map((zfilaCampoState: IZFilaCamposState, index: number) => {
                                return (
                                    <tr key={index}>
                                        {zfilaCampoState.cmpsState.map((zcampoAPintar: IZCampoState, index: number) => {
                                            return (
                                                <td key={index}>
                                                    <ZCampo
                                                        zFormaTabla={this.props.zFormaTabla}
                                                        zCampo={zcampoAPintar}
                                                    />
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>)
                }

                <div style={{ clear: 'both' }}> </div>
            </div>
        );
    }
}