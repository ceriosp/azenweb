import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';

import {
    Row,
    Col,
    Form,
    Button,
    Modal,
    Panel
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel,
    ZReferenciaViewModel,

} from "../../zcommon";

import ZBarraBotones from './ZBarraBotones';
import ZRecursoBasico from './ZRecursoBasico';
import ZRecursoZoom from './ZRecursoZoom';
import ZRecursoMovimiento from './ZRecursoMovimiento';

interface OwnProperties {

    onCerrarVentanaFn: (zRecursoViewModel: ZRecursoViewModel) => void;
    onCampoZoomClick: (zreferenciaViewModel: ZReferenciaViewModel) => void;

    //Pila de recursos zoom indx by id
    mapRecursosZoomActivosIndxById: Map<string, ZRecursoViewModel>;

    zRecursoViewModel: ZRecursoViewModel;
    zcamposBotonesComandos: Array<ZCampoModel>;
    zcamposBotonesLineaList: Array<ZCampoModel>;

    cssPropertiesFromParent: CSSProperties;
    container?: any;
    esModal: boolean;
}

export default class ZVentanaRecursoMovimiento extends React.PureComponent<OwnProperties, void>
{
    private zRecursoViewModel: ZRecursoViewModel;

    constructor(props: OwnProperties) {
        super(props);

        this.onCerrarVentana = this.onCerrarVentana.bind(this);
        this.cerrarVentanaZoom = this.cerrarVentanaZoom.bind(this);
    }

    render() {

        this.initializeRender();

        console.log("call ventanarecursobasico render");

        return (
            <div>
                <Modal
                    style={this.props.cssPropertiesFromParent}
                    onHide={this.onCerrarVentana}
                    show={true}
                    container={this.props.container}
                    backdrop={false}
                    autoFocus={false}
                    enforceFocus={false}
                    bsSize={"large"}
                    aria-labelledby="contained-modal-title">

                    <Modal.Header className="bg-primary" closeButton>
                        <Modal.Title>{this.zRecursoViewModel.ven.descr}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.getRecursoAPintar()}
                    </Modal.Body>

                    <Modal.Footer>
                        <ZBarraBotones
                            zcamposBotonesComandosList={this.props.zcamposBotonesComandos}
                            zcamposBotonesLineaList={this.props.zcamposBotonesLineaList} />
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    onCerrarVentana(zrecursoViewModelZoom?: ZRecursoViewModel) {

        if (zrecursoViewModelZoom.tipoRecurso && zrecursoViewModelZoom.tipoRecurso == ZCommon.Constants.TipoRecurso.Zoom) {
            this.cerrarVentanaZoom(zrecursoViewModelZoom);
            return;
        }

        this.props.onCerrarVentanaFn(this.props.zRecursoViewModel);
    }

    getRecursoAPintar() {
        switch (this.zRecursoViewModel.tipoRecurso) {
            case ZCommon.Constants.TipoRecurso.Basico:
                return (
                    <ZRecursoBasico
                        zRecursoViewModel={this.zRecursoViewModel}
                        onCampoZoomClick={this.props.onCampoZoomClick}
                        onCerrarVentanaFn={this.props.onCerrarVentanaFn}
                        container={this.props.container}
                        mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}
                        esModal={this.props.esModal} />
                );
            case ZCommon.Constants.TipoRecurso.Movimento:
                return (
                    <ZRecursoMovimiento
                        zRecursoViewModel={this.zRecursoViewModel}
                        onCampoZoomClick={this.props.onCampoZoomClick} />
                );
        }
    }

    cerrarVentanaZoom(zrecursoViewModelZoom: ZRecursoViewModel) {
        this.props.onCerrarVentanaFn(zrecursoViewModelZoom);
    }

    initializeRender() {
        this.zRecursoViewModel = this.props.zRecursoViewModel;
    }
}