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
    ZPantexState,
    IZPantexState,

} from "../../zcommon";

import {
    //Components
    ZVentanaRecurso
} from "../../zpantex";
import { ZMenuRootContainer } from "../../zmenu/containers/ZMenuRootContainer";
import { ZProcesandoContainer } from "../../zaplicacion/containers/ZProcesandoContainer";
import { ZAplicacionContainer } from "../../zaplicacion/containers/ZAplicacionContainer";
import { ZPantexContainer } from '../../zpantex/containers/ZPantexContainer';

export interface OwnProps {

}

export interface ConnectedState {
    pilaZPantexState: Array<ZPantexState>;
}

export interface ConnectedDispatch {

}

export class ZAplicacion extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private zAplicacionDivElement: HTMLDivElement;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <ZMenuRootContainer
                        index={0}
                    />
                </div>

                <div>
                    <ZAplicacionContainer />
                </div>

                <div>
                    <ZProcesandoContainer />
                </div>

            </div>
        );
    }
}