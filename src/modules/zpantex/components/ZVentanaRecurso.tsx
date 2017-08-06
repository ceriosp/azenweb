import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';


import * as ZCommon from "../../zcommon";
import {
    ZRecursoViewModel,
    ZCampoModel,
    ZReferenciaViewModel,
} from "../../zcommon";

import ZVentanaRecursoBasico from './ZVentanaRecursoBasico';
import ZVentanaRecursoZoom from './ZVentanaRecursoZoom';
import ZVentanaRecursoMovimiento from './ZVentanaRecursoMovimiento';

interface OwnProperties {

    onCerrarVentanaFn: (zRecursoViewModel: ZRecursoViewModel) => void;
    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void

    mapRecursosZoomActivosIndxById: Map<string, ZRecursoViewModel>;
    container?: any;
    zRecursoViewModel: ZRecursoViewModel;

    esModal: boolean;
}

export default class ZVentanaRecurso extends React.Component<OwnProperties, undefined>
{
    private zRecursoViewModel: ZRecursoViewModel;
    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];
    private modalCSSProperties: CSSProperties = new Object();

    constructor(props: OwnProperties) {
        super(props);
        //console.log("constructor ventana recurso " + this.props.zRecursoViewModel.ven.nomTbl);

        this.onCerrarVentana = this.onCerrarVentana.bind(this);
    }

    render() {

        console.log("zventanarecurso render");

        this.initializeRender();        
        this.initializeCSSModalStyle();

        return this.getVentanaRecursoAPintar();
    }

    onCerrarVentana(zrecursoViewModelZoom?: ZRecursoViewModel) {

        if (zrecursoViewModelZoom.tipoRecurso && zrecursoViewModelZoom.tipoRecurso == ZCommon.Constants.TipoRecurso.Zoom) {
            this.props.onCerrarVentanaFn(zrecursoViewModelZoom);
            return;
        }

        this.props.onCerrarVentanaFn(this.props.zRecursoViewModel);
    }

    initializeRender() {
        this.zRecursoViewModel = this.props.zRecursoViewModel;
        this.zcamposBotonesComandos = new Array<ZCampoModel>();
        this.zcamposBotonesLineaList = new Array<ZCampoModel>();
        this.clasificarBotonesAPintar();
    }

    initializeCSSModalStyle() {

        let top = this.zRecursoViewModel.tipoRecurso == ZCommon.Constants.TipoRecurso.Basico
            ? 50
            : 0;
        if (this.props.zRecursoViewModel.visible) {
            this.modalCSSProperties = {
                display: "block",
                top: top + "px"
            } as CSSProperties;
        } else {
            this.modalCSSProperties = {
                display: "none",
            } as CSSProperties;
        }
    }

    clasificarBotonesAPintar() {

        let message = this.zRecursoViewModel
            ?
                this.zRecursoViewModel.ven
                ? 
                    this.zRecursoViewModel.ven.descr
                : 
                    "noven"
            :"viewm undef"

        console.log("zventanarecurso - clasif " + message);

        console.log(this.props.mapRecursosZoomActivosIndxById);

        let zcampoAPintar: ZCampoModel;
        for (let i = 0; i < this.props.zRecursoViewModel.camps.length; i++) {

            zcampoAPintar = this.props.zRecursoViewModel.camps[i];
            if (zcampoAPintar.etq.startsWith("@@B") || zcampoAPintar.etq.startsWith("@B")) //Botón
            {
                this.zcamposBotonesComandos.push(zcampoAPintar);
                continue;
            }
            if (zcampoAPintar.etq.startsWith("@L"))//Botones línea comandos
            {
                this.zcamposBotonesLineaList.push(zcampoAPintar);
                continue;
            }
        }
    }

    getVentanaRecursoAPintar() {

        switch (this.zRecursoViewModel.tipoRecurso) {

            case ZCommon.Constants.TipoRecurso.Basico:
                return (
                    <ZVentanaRecursoBasico
                        onCerrarVentanaFn={this.onCerrarVentana}
                        onCampoZoomClick={this.props.onCampoZoomClick}
                        mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}
                        container={this.props.container}
                        zRecursoViewModel={this.zRecursoViewModel}
                        cssPropertiesFromParent={this.modalCSSProperties}
                        zcamposBotonesComandos={this.zcamposBotonesComandos}
                        zcamposBotonesLineaList={this.zcamposBotonesLineaList}
                        esModal={this.props.esModal} />);

            case ZCommon.Constants.TipoRecurso.Zoom:
                return (
                    <ZVentanaRecursoZoom
                        onCerrarVentanaFn={this.onCerrarVentana}
                        zRecursoViewModel={this.zRecursoViewModel}
                        cssPropertiesFromParent={this.modalCSSProperties}
                        zcamposBotonesComandos={this.zcamposBotonesComandos}
                        zcamposBotonesLineaList={this.zcamposBotonesLineaList}
                        container={this.props.container} />);

            case ZCommon.Constants.TipoRecurso.Movimento:
                return (
                    <ZVentanaRecursoMovimiento
                        onCerrarVentanaFn={this.onCerrarVentana}
                        onCampoZoomClick={this.props.onCampoZoomClick}
                        mapRecursosZoomActivosIndxById={this.props.mapRecursosZoomActivosIndxById}
                        container={this.props.container}
                        zRecursoViewModel={this.zRecursoViewModel}
                        cssPropertiesFromParent={this.modalCSSProperties}
                        zcamposBotonesComandos={this.zcamposBotonesComandos}
                        zcamposBotonesLineaList={this.zcamposBotonesLineaList}
                        esModal={this.props.esModal} />);
        }
    }
}