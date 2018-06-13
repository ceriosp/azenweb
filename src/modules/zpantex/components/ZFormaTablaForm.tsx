import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Table,
    Panel
} from 'react-bootstrap';

import { Constants } from "../constants";

import {
    Constants as ZCommonConstants
} from '../../zcommon/constants';

import {
    IZMenuItem,
    IZMenu,
} from '../../zcommon/contracts';
import { IZFormaTablaState, IZCampoState, ZFilaCamposState, IZFilaCamposState, IZPantexState } from "../../zcommon";
import ZCampo from "./ZCampo";


export interface OwnProps {
    zPantex: IZPantexState;
    zFormaTabla: IZFormaTablaState;
    zftIndex: number;
}

export interface ConnectedDispatch {

}

export interface ConnectedState {
}


export class ZFormaTablaForm extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{
    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);
    }

    render(): any {

        return (
            <Form
                horizontal
            >
                {this.props.zFormaTabla.cmpsState.map((zcampoAPintar: IZCampoState, index: number) => {
                    return (
                        <Col
                            md={this.props.zFormaTabla.venState.factorDivision ? this.props.zFormaTabla.venState.factorDivision : 4}
                            key={zcampoAPintar.id}
                        >
                            <ZCampo
                                zFormaTabla={this.props.zFormaTabla}
                                tipoCmdPantex={this.props.zPantex.tipoCmdPantex}
                                zCampo={zcampoAPintar}
                            />
                        </Col>
                    );
                })}
            </Form>
        );
    }
}