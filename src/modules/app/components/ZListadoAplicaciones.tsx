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
import { ZLoginContainer } from '../../zlogin/containers/ZLoginContainer';

export interface OwnProps {

}

export interface ConnectedState {
    zLoginModule: IZLoginModule
}

export interface ConnectedDispatch {

}

export class ZListadoAplicaciones extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
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

                <ZProcesandoContainer />
            </div>
        );
    }

    private renderAplList(zLoginModule: IZLoginModule) {

        let zAplCols: Array<JSX.Element> = [];

        zLoginModule.zAplList.apls.forEach((zApl: IZApl, index: number) => {
            zAplCols.push(
                <Col
                    key={'zAplCol' + index}
                    xs={12}
                    xsOffset={0}
                    sm={4}
                    smOffset={0}
                    md={4}
                    mdOffset={0}
                    lg={2}
                    lgOffset={((index) % 4 == 0) ? 2 : 0}
                >
                    <Thumbnail src="dist/img/azenLogo.jpg">
                        <h4>{zApl.descr}</h4>
                        <p>
                            <Button
                                bsStyle="primary"
                                value={zApl.apl}
                                href={'?idApl=' + zApl.apl + '&nomApl=' + zApl.descr + '&lanzarMenu=1'}
                                target="_blank">
                                Ejecutar
                        </Button>
                        </p>
                    </Thumbnail>
                </Col>
            );
        });

        const zAplsContainer: JSX.Element = (
            <Grid
                fluid
                style={{
                    paddingTop: "2%"
                }}
            >
                <Row>{zAplCols}</Row>
            </Grid>
        );

        return zAplsContainer;
    }
}