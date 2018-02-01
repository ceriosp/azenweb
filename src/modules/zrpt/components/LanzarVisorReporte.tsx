import * as React from 'react';

import {
    CSSProperties
} from 'react';

import {
    Row,
    Col,
    Button
} from 'react-bootstrap';

export interface OwnProps {

}

export interface ConnectedState {
    azenURL: string;
    mostrarReporte: boolean;
    rutaReporte: string;
}

export interface ConnectedDispatch {
    cerrarVisorReporte: () => void;
}

export class LanzarVisorReporte extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.lanzarVisorReporte = this.lanzarVisorReporte.bind(this);
        this.cerrarVisorReporte = this.cerrarVisorReporte.bind(this);
    }

    public render(): any {
        return (
            <div>
                {(this.props.mostrarReporte && this.props.rutaReporte != '') && (
                    this.lanzarVisorReporte()
                )}
                &nbsp;
            </div>
        );
    }

    private lanzarVisorReporte() {
        window.open(this.props.azenURL + '/azenweb' + this.props.rutaReporte, "_blank");
        this.props.cerrarVisorReporte();
    }

    private cerrarVisorReporte() {
        this.props.cerrarVisorReporte();
    }

}