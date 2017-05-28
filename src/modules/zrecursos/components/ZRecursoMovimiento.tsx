import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Panel
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel,
    ZReferenciaViewModel,
} from "../../zcommon";

import * as ZRecurso from '../index';

import ZCampo from './ZCampo';

interface OwnProperties {
    zRecursoViewModel: ZRecursoViewModel;
    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void
}

export default class ZRecursoMovimiento extends React.Component<OwnProperties, void>
{

    private zRecursoViewModel: ZRecursoViewModel;
    private encabezadoZRecursoViewModel: ZRecursoViewModel;
    private detalleZRecursoViewModel: ZRecursoViewModel;

    private zrecursoServices: ZRecurso.Services.ZRecursoServices;

    constructor(props: OwnProperties) {
        super(props);
        this.zrecursoServices = new ZRecurso.Services.ZRecursoServices();        
    }

    render() {

        console.log("call movimiento render");
        
        this.initializeRender();

        return (
            <div>
                
            </div>
        );
    }

    initializeRender() {
        this.zRecursoViewModel = this.props.zRecursoViewModel;
        this.initializeEncabezadoZRecursoViewModel();
        this.initializeDetalleZRecursoViewModel();
    }

    initializeEncabezadoZRecursoViewModel() {
        let { zRecursoViewModel, encabezadoZRecursoViewModel } = this;
        
        this.encabezadoZRecursoViewModel = this.zrecursoServices.getZRecursoViewModelDeepImmutableCopy(
            this.zRecursoViewModel,
            (): Array<ZCampoModel> => {
                return zRecursoViewModel.camps.slice(zRecursoViewModel.ven.fil + 1, zRecursoViewModel.camps.length);
            }
        );

        console.log(this.encabezadoZRecursoViewModel);
    }

    initializeDetalleZRecursoViewModel() {
        let { zRecursoViewModel, encabezadoZRecursoViewModel } = this;
        this.detalleZRecursoViewModel = this.zrecursoServices.getZRecursoViewModelDeepImmutableCopy(
            this.zRecursoViewModel,
            (): Array<ZCampoModel> => {
                return zRecursoViewModel.camps.slice(0, zRecursoViewModel.ven.fil);
            }
        );
    }
}