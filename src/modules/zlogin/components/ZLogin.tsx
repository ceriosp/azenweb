import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Row,
    Col,
    Glyphicon,
    Navbar,
    Nav,
    MenuItem,
    NavItem,
    NavDropdown,
    Form,
    FormGroup,
    FormControl,
    Button,
    Modal
} from 'react-bootstrap';

import {
    IZMenuItem,
    IZMenu
} from '../../zcommon/contracts';

export interface OwnProps {

}

export interface ConnectedState {

}

export interface ConnectedDispatch {
}

export class ZLogin extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: ConnectedState & ConnectedDispatch & OwnProps) {
        super(props);
    }

    public render(): any {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Ingreso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalUsername">
                                <Col sm={2}>
                                    Usuario:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="username" placeholder="Nombre de usuario" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col sm={2}>
                                    Contraseña
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Contraseña" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={10} sm={2}>
                                    <Button type="button">
                                        Ingresar
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        );
    }
}