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
import ZVentanaRecurso from './ZVentanaRecurso';

interface OwnProperties {

    onCerrarVentanaFn: (zRecursoViewModel: ZRecursoViewModel) => void;
    onCampoZoomClick: (zreferenciaViewModel: ZReferenciaViewModel) => void;

    //Pilas de todas las ventanas, incluyendo recursos zooms
    mapRecursosZoomActivosIndxById: Map<string, ZRecursoViewModel>;

    zRecursoViewModel: ZRecursoViewModel;
    zcamposBotonesComandos: Array<ZCampoModel>;
    zcamposBotonesLineaList: Array<ZCampoModel>;

    cssPropertiesFromParent: CSSProperties;
    container?: any;
    esModal: boolean;
}

export default class ZVentanaRecursoBasico extends React.Component<OwnProperties, void>
{
    private zRecursoViewModel: ZRecursoViewModel;
    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];

    private divZoomContainer: HTMLDivElement;

    constructor(props: OwnProperties) {
        super(props);

        this.onCerrarVentana = this.onCerrarVentana.bind(this);
        this.cerrarVentanaZoom = this.cerrarVentanaZoom.bind(this);
    }

    render() {

        this.renderInitialize();

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
                        <ZRecursoBasico zRecursoViewModel={this.zRecursoViewModel} onCampoZoomClick={this.props.onCampoZoomClick} />
                        <div ref={(divZoomContainer: HTMLDivElement) => { 
                                this.divZoomContainer = divZoomContainer; 
                            }}>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <ZBarraBotones
                            zcamposBotonesComandosList={this.zcamposBotonesComandos}
                            zcamposBotonesLineaList={this.zcamposBotonesLineaList} />
                    </Modal.Footer>
                </Modal>

                {this.renderRecursosZoom()}

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

    cerrarVentanaZoom(zrecursoViewModelZoom: ZRecursoViewModel) {
        this.props.onCerrarVentanaFn(zrecursoViewModelZoom);
    }

    renderInitialize() {
        this.zRecursoViewModel = this.props.zRecursoViewModel;
        this.zcamposBotonesComandos = this.props.zcamposBotonesComandos;
        this.zcamposBotonesLineaList = this.props.zcamposBotonesLineaList;
    }

    renderRecursosZoom(): Array<ZVentanaRecurso> {

        let zventanasRecursoZoomCompList = new Array<any>();

        //debugger
        this.zRecursoViewModel.mapZoomsIdsIndxByCampo.forEach((zreferenciaViewModel: ZReferenciaViewModel, nomCmp: string) => {

            if (!this.props.mapRecursosZoomActivosIndxById.has(zreferenciaViewModel.nomRcrZoom)) {
                //continue
                return true;
            }
            zventanasRecursoZoomCompList.push(
                <ZVentanaRecurso
                    key={nomCmp}
                    mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}
                    container={this.props.container}
                    onCerrarVentanaFn={this.onCerrarVentana}
                    zRecursoViewModel={this.props.mapRecursosZoomActivosIndxById.get(zreferenciaViewModel.nomRcrZoom)}
                    esModal={this.props.esModal}
                />);
        });

        return zventanasRecursoZoomCompList;
    }
}