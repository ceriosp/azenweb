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
import { IZFormaTablaState, IZCampoState } from "../../zcommon";
import ZCampo from "./ZCampo";


export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
}

export interface ConnectedDispatch {

}

export interface ConnectedState {
}


export class ZFormaTablaCmpsFijos extends React.PureComponent<OwnProps & ConnectedDispatch, ConnectedState>
{
    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);
    }

    render(): any {

        return (
            <Panel bsStyle="info">
                <Form
                    horizontal
                >
                    {this.props.zFormaTabla.camposFijosList.map((zcampoAPintar: IZCampoState, index: number) => {
                        return (
                            <Col
                                key={index}
                                md={4}
                            >
                                <ZCampo
                                    zFormaTabla={this.props.zFormaTabla}
                                    zCampo={zcampoAPintar}
                                />
                            </Col>
                        );
                    })}
                </Form>
            </Panel>
        );
    }
}