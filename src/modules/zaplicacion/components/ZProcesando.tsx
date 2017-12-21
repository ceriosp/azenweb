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

export interface OwnProps {

}

export interface ConnectedState {
    show: boolean;
    tipoAJAXIndicador: number;
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
                show={this.props.show && this.props.tipoAJAXIndicador == ZCommon.Constants.TipoAJAXIndicadorEnum.MODAL}
                onHide={null}
                bsSize="small"
                aria-labelledby="contained-modal-title-sm"
                style={{
                    top: "50px"
                }}
            >
                <Modal.Body>
                    <div className="zaplicacion-zprocesando-loader">
                        <div className="sk-folding-cube">
                            <div className="sk-cube1 sk-cube"></div>
                            <div className="sk-cube2 sk-cube"></div>
                            <div className="sk-cube4 sk-cube"></div>
                            <div className="sk-cube3 sk-cube"></div>
                        </div>
                        <h4>&nbsp;&nbsp;&nbsp;Procesando</h4>                        
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}