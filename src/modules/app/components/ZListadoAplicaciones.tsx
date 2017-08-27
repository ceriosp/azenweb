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

    /**
     * 50 applications - 8 applications by row
     * las two applications in the third row?
     * Every row has to have a maxwith {1} eg. -> <Thumbail xs={1} sm={1} md={1} lg={1}>
     */
    private renderAplList(zLoginModule: IZLoginModule) {

        let zAplRows: Array<JSX.Element> = [];
        let rowsNumber = Math.ceil(zLoginModule.zAplList.apls.length / 8);

        let currentApl: number = 0;

        for (let i = 0; i < rowsNumber; i++) {

            let zAplColumns: Array<JSX.Element> = [];

            for (let j = 0; j < zLoginModule.zAplList.apls.length; j++) {

                zAplColumns.push(
                    <Col key={'zAplCol' + currentApl} xs={1} sm={1} md={1} lg={1}>
                        <Thumbnail src="dist/img/azenLogo.jpg">
                            <p>{zLoginModule.zAplList.apls[currentApl].descr}</p>
                            <p>
                                <Button
                                    bsStyle="primary"
                                    onClick={this.lanzarAplicacion}
                                    value={zLoginModule.zAplList.apls[currentApl].apl}
                                    href={'?idApl=' + zLoginModule.zAplList.apls[currentApl].apl}
                                    target="_blank">
                                    Inciar
                                </Button>
                            </p>
                        </Thumbnail>
                    </Col>
                );
                currentApl++;

                if (j == 7) break;
            }

            zAplRows.push(<Row key={'zAplRow' + i}>{zAplColumns}</Row>);
        }

        const zAplsContainer: JSX.Element = (
            <Grid fluid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        {zAplRows}
                    </Col>
                </Row>
            </Grid>
        );

        return (
            zAplsContainer
        );
    }
} 7