import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Modal
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

export interface OwnProps {

}

export interface ConnectedState {
    show:boolean;
}

export interface ConnectedDispatch {
    
}

export class ZProcesando extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {

        super(props);
    }

    render() {
        return (
            <Modal  
                show={this.props.show}
                onHide={null}
                bsSize="small" 
                aria-labelledby="contained-modal-title-sm"
            >
                <Modal.Body>
                    <h4>Procesando...</h4>
                </Modal.Body>
            </Modal>
        );
    }
}