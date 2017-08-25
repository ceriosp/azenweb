import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    Grid,
    Row,
    Col,
    Thumbnail,
    Button,
    Panel
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

    //Contracts
    IZLoginModule,
    IZApl,

} from "../../zcommon";

import {
    //Components
    ZVentanaRecurso
} from "../../zpantex";
import { ZMenuRootContainer } from "../../zmenu/containers/ZMenuRootContainer";
import { ZProcesandoContainer } from "../../zaplicacion/containers/ZProcesandoContainer";
import { ZAplicacionContainer } from "../../zaplicacion/containers/ZAplicacionContainer";
import { ZLoginContainer } from '../../zlogin/containers/ZloginContainer';

export interface OwnProps {

}

export interface ConnectedState {
    zLoginModule: IZLoginModule
}

export interface ConnectedDispatch {
    lanzarAplicacion: (identificadorAplicacion: string) => void;
}

export class ZListadoAplicaciones extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {

        super(props);

        this.lanzarAplicacion = this.lanzarAplicacion.bind(this);
    }

    render() {
        return (
            <div>
                {(!this.props.zLoginModule.zAplList.apls) || (this.props.zLoginModule.zAplList.apls.length == 0) && (
                    <ZLoginContainer />
                )}

                {this.props.zLoginModule.zAplList.apls.length > 0 && (

                    this.renderAplList(this.props.zLoginModule)
                )}
            </div>
        );
    }

    private lanzarAplicacion(e: any) {
        this.props.lanzarAplicacion(e.target.value);
    }

    private renderAplList(zLoginModule: IZLoginModule) {

        let thumbnails: any = [];

        zLoginModule.zAplList.apls.forEach((apl: IZApl, index: number) => {

            let thumbnail = (
                <Col xs={2} sm={2} md={2} lg={2}>
                    <Thumbnail src="dist/img/azenLogo.jpg">
                        <p>{apl.descr}</p>
                        <p>
                            <Button id="" bsStyle="primary" href="#" target="_blank">Inciar</Button>
                        </p>
                    </Thumbnail>
                </Col>
            );

            thumbnails.push(thumbnail);
        });

        const aplicationsGrid = (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Row>
                            {thumbnails}
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );

        return (
            aplicationsGrid
        );
    }
}