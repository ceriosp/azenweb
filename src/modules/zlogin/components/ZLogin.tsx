import * as React from 'react';

import {
    CSSProperties
} from 'react';

var Modal = require('react-bootstrap-modal');

import {
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    Button,
    Image
} from 'react-bootstrap';

import {
    IZLoginModule
} from '../../zcommon/contracts';

export interface OwnProps {

}

export interface ConnectedState {
    zLoginModule: IZLoginModule;
}

export interface ConnectedDispatch {
    despacharLogin: () => void;
    usernameChanged: (username: string) => void;
    passwordChanged: (password: string) => void;
}

export class ZLogin extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {

        super(props);

        this.onIngresarClick = this.onIngresarClick.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
    }

    public render(): any {
        return (
            <div className="static-modal">
                <Modal show={true} onHide={function () { }}>
                    <Modal.Header>
                        <Modal.Title>Ingreso</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col className="text-center" smHidden mdHidden lgHidden>
                                <img src="dist/img/azenLogo.jpg" />
                            </Col>
                            <Col
                                xs={12}
                                sm={9}>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalUsername">
                                        <Col
                                            xs={12}
                                            sm={3}
                                            lg={3}>
                                            Usuario:
                                        </Col>
                                        <Col
                                            xs={12}
                                            sm={9}
                                            lg={9}>
                                            <FormControl
                                                type="username"
                                                placeholder="Nombre de usuario"
                                                value={this.props.zLoginModule.username}
                                                onChange={this.onUsernameChanged} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalPassword">
                                        <Col
                                            xs={12}
                                            sm={3}
                                            lg={3}>
                                            Contraseña:
                                        </Col>
                                        <Col
                                            xs={12}
                                            sm={9}
                                            lg={9}>
                                            <FormControl
                                                type="password"
                                                placeholder="Contraseña"
                                                value={this.props.zLoginModule.password}
                                                onChange={this.onPasswordChanged} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col
                                            xs={12}
                                            sm={3}
                                            smOffset={9}
                                            lg={3}
                                            lgOffset={9}
                                        >
                                            <Button
                                                type="button"
                                                onClick={this.onIngresarClick}>
                                                Ingresar
                                        </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col xsHidden sm={3}>
                                <img src="dist/img/azenLogo.jpg" />
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        Azen
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }

    private onIngresarClick() {
        this.props.despacharLogin();
    }

    private onUsernameChanged(e: any) {
        this.props.usernameChanged(e.target.value);
    }

    private onPasswordChanged(e: any) {
        this.props.passwordChanged(e.target.value);
    }
}