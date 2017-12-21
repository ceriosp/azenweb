import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Row,
    Col
} from 'react-bootstrap';

import * as ZCommon from '../../zcommon';
import {

    //Models
    ZRecursoModel,
    ZRecursoViewModel,
    ZReferenciaViewModel,

    //State
    ZAplicationState,

    //Utils
    EntityNormalizedObj,

} from "../../zcommon";

import {
    //Components
    ZVentanaRecurso
} from "../../zpantex";
import { ZMenuRootContainer } from "../../zmenu/containers/ZMenuRootContainer";
import { ZProcesandoContainer } from "../../zaplicacion/containers/ZProcesandoContainer";
import { ZAplicacionContainer } from "../../zaplicacion/containers/ZAplicacionContainer";

export interface OwnProps {

}

export interface ConnectedState {

}

export interface ConnectedDispatch {

}

export class ZAplicacion extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <ZMenuRootContainer
                        index={0}
                        sobrePonerse={true}
                    />
                </Row>
                <Row>
                    <ZAplicacionContainer />
                    <ZProcesandoContainer />
                </Row>
            </div>
        );
    }
}