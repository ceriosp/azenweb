import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    CSSProperties
} from 'react';

import {
    Col,
    Form,
    Panel,
    Table
} from 'react-bootstrap';

import {
    ZRecursoViewModel,
    ZRecursoModel,
    ZCampoModel
} from "../../zcommon";

import ZCampo from './ZCampo';

interface OwnProperties {
    zRecursoViewModel: ZRecursoViewModel;
}

export default class ZRecursoBasico extends React.Component<OwnProperties, void>
{
    private zRecursoViewModel: ZRecursoViewModel;
    private zcampoRegionEnProceso: ZCampoModel;

    private zcamposTitulos: Array<ZCampoModel> = [];

    constructor(props: OwnProperties) {
        super(props);
    }

    render() {

        this.renderInitialize();
        this.clasificarColumnasAPintar();

        return (
            <Panel>
                <Form horizontal>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                {this.zcamposTitulos.map(this.pintarTitulosColumnas.bind(this))}
                            </tr>
                        </thead>
                        <tbody>
                            {this.pintarFilasFicticias()}
                        </tbody>
                    </Table>
                </Form>
            </Panel>
        );
    }

    renderInitialize() {
        this.zRecursoViewModel = this.props.zRecursoViewModel;
        this.zcamposTitulos = new Array<ZCampoModel>();
    }

    pintarTitulosColumnas(zcampoAPintar: ZCampoModel, index: number) {
        return (
            <th key={index}>
                {zcampoAPintar.etq}
            </th>
        );
    }

    pintarFilasFicticias(){

        let arrFilas = new Array<any>();        
        for(let i=0; i<10; i++){
            arrFilas.push((
                <tr key={i}>
                    {this.zcamposTitulos.map((zcampoAPintar: ZCampoModel, index:number)=>{
                        return(
                            <td key={index}>
                                {zcampoAPintar.nomCmp + "_" + i}
                            </td>
                        );
                    })}
                </tr>
            ));
        }

        return arrFilas;
    }

    clasificarColumnasAPintar() {

        let zcampoAPintar: ZCampoModel;
        for (let i = 0; i < this.props.zRecursoViewModel.camps.length; i++) {
            zcampoAPintar = this.props.zRecursoViewModel.camps[i];
            this.zcamposTitulos.push(zcampoAPintar);
        }
    }
}