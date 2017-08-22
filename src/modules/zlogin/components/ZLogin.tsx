import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Form,
    FormGroup,
    FormControl,
    Button,
    Modal,
    Col
} from 'react-bootstrap';

import {
    IZLoginModule
} from '../../zcommon/contracts';

export interface OwnProps {

}

export interface ConnectedState {
    zLogin: IZLoginModule;
}

export interface ConnectedDispatch {
    login: () => void;
    usernameChanged: (username:string) => void;
    passwordChanged: (password:string) => void;
}

export class ZLogin extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: ConnectedState & ConnectedDispatch & OwnProps) {
        super(props);

        this.onIngresarClick = this.onIngresarClick.bind(this);
        this.onUsernameChanged = this.onUsernameChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
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
                                    <FormControl
                                        type="username"
                                        placeholder="Nombre de usuario"
                                        onChange={this.onUsernameChanged} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col sm={2}>
                                    Contraseña
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="password"
                                        placeholder="Contraseña"
                                        onChange={this.onPasswordChanged} />
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

    private onIngresarClick() {
        this.props.login();
    }

    private onUsernameChanged(e:any) {
        this.props.usernameChanged(e.target.value);
    }

    private onPasswordChanged(e:any) {
        this.props.passwordChanged(e.target.value);       
    }
}