import * as React from 'react';

import * as ZCommon from "../../zcommon";
import {
    ZRecursoViewModel,    
    ZReferenciaViewModel,
} from "../../zcommon";

import ZRecursoBasico from './ZRecursoBasico';
import ZRecursoZoom from './ZRecursoZoom';
import ZRecursoMovimiento from './ZRecursoMovimiento';

interface OwnProperties {

    //Common
    zRecursoViewModel: ZRecursoViewModel;

    //basico
    onCerrarVentanaFn?: (zRecursoViewModel: ZRecursoViewModel) => void;
    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void;    
    mapRecursosZoomActivosIndxById?: Map<string, ZRecursoViewModel>;

    esModal?: boolean;
    container?: any;
}

export default class ZRecurso extends React.PureComponent<OwnProperties, undefined>
{
    private zRecursoViewModel: ZRecursoViewModel;
    private recursoYaArmado: boolean;

    constructor(props: OwnProperties) {
        super(props);
    }

    render() {

        this.initializeRender();

        return this.getRecursoAPintar();
    }

    initializeRender() {
        this.zRecursoViewModel = this.props.zRecursoViewModel;
    }

/*
    shouldComponentUpdate() {        
        let shouldUpdate = !this.recursoYaArmado && this.props.zRecursoViewModel.visible;
        console.log("should update: " + shouldUpdate)
        return shouldUpdate;
    }
*/
    componentDidMount() {
        this.recursoYaArmado = true;
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

            case ZCommon.Constants.TipoRecurso.Zoom:
                return (
                    <ZRecursoZoom zRecursoViewModel={this.zRecursoViewModel} />
                );

            case ZCommon.Constants.TipoRecurso.Movimento:
                return (
                    <ZRecursoMovimiento
                        zRecursoViewModel={this.zRecursoViewModel} />
                );
                
            case ZCommon.Constants.TipoRecurso.Multi:
                return (<div>MULTI</div>);
        }
    }
}

