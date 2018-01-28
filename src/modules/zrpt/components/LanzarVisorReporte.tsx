import * as React from 'react';

import {
    CSSProperties
} from 'react';

var Modal = require('react-bootstrap-modal');

import {
    Row,
    Col,
    Button
} from 'react-bootstrap';

export interface OwnProps {

}

export interface ConnectedState {
    mostrarReporte: boolean;
    rutaReporte: string;
}

export interface ConnectedDispatch {
    cerrarVisorReporte: () => void;
}

export class LanzarVisorReporte extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.cerrarVisorReporte = this.cerrarVisorReporte.bind(this);
    }

    public render(): any {
        return (
            <div className="static-modal">
                <Modal
                    show={this.props.mostrarReporte}
                    onHide={this.cerrarVisorReporte}
                    style={{
                        top: "50px"
                    }}
                >
                    <Modal.Header
                        style={{
                            backgroundColor: "#337ab7",
                            borderColor: "#337ab7",
                            color: "#fff"
                        }}
                    >
                        <Modal.Title>Visor de reportes</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                Se ha generado el reporte exitosamente, haga clic en el siguiente enlace para descargar:
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col
                                xs={12}
                                sm={4}
                                smOffset={4}
                                md={12}
                                lg={12}
                            >
                                <a href={'http://52.42.49.101:8080/azenweb' + this.props.rutaReporte} target="_blank">Descargar reporte aqu&iacute;</a>
                            </Col>
                        </Row>
                        <br/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.cerrarVisorReporte}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }

    cerrarVisorReporte() {
        this.props.cerrarVisorReporte();
    }

}