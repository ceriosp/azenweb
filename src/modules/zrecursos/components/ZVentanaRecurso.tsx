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
    ZCampoModel,
    ZReferenciaViewModel,

} from "../../zcommon";

import ZBarraBotones from './ZBarraBotones';
import ZVentanaRecursoBasico from './ZVentanaRecursoBasico';
import ZVentanaRecursoZoom from './ZVentanaRecursoZoom';

interface OwnProperties {
    onCerrarVentanaFn?: (zRecursoViewModel: ZRecursoViewModel) => void;
    container?: any;
    zRecursoViewModel: ZRecursoViewModel;
    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void
}

export default class ZVentanaRecurso extends React.Component<OwnProperties, void>
{
    private zRecursoViewModel: ZRecursoViewModel;
    private zcamposBotonesComandos: Array<ZCampoModel> = [];
    private zcamposBotonesLineaList: Array<ZCampoModel> = [];
    private modalCSSProperties: CSSProperties = new Object();

    constructor(props: OwnProperties) {
        super(props);
        console.log("constructor ventana recurso " + this.props.zRecursoViewModel.ven.nomTbl);

        this.cerrarVentana = this.cerrarVentana.bind(this);
    }

    render() {

        this.initializeRender();
        this.initializeCSSModalStyle();        

        return (
            <div>
                {this.getVentanaRecursoAPintar()}
            </div>
        );
    }

    cerrarVentana() {
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
                    : 70;
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
                        onCerrarVentanaFn={this.cerrarVentana}
                        container={this.props.container}
                        zRecursoViewModel={this.zRecursoViewModel}
                        onCampoZoomClick={this.props.onCampoZoomClick}
                        cssPropertiesFromParent={this.modalCSSProperties}
                        zcamposBotonesComandos={this.zcamposBotonesComandos}
                        zcamposBotonesLineaList={this.zcamposBotonesLineaList} />);

            case ZCommon.Constants.TipoRecurso.Zoom:
               return (
                    <ZVentanaRecursoZoom
                        onCerrarVentanaFn={this.cerrarVentana}
                        zRecursoViewModel={this.zRecursoViewModel}
                        cssPropertiesFromParent={this.modalCSSProperties}
                        zcamposBotonesComandos={this.zcamposBotonesComandos}
                        zcamposBotonesLineaList={this.zcamposBotonesLineaList} />);                
        }
    }
}