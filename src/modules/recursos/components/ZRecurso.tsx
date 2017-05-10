import * as React from 'react';

import {
    Row,    
    Col,
} from 'react-bootstrap';

import {
    ZRecursoModel,
    ZCampoModel
} from "../model";

import {
    RecursosConstants
} from "../constants";

import ZCampo from './ZCampo';

interface OwnProperties
{
    zRecursoModel:ZRecursoModel;
}

export default class ZRecurso extends React.Component<OwnProperties, void>
{
    private previousRow:number = 0;
    private currentRow:number = 0;

    renderZCampo(zCampoModel:ZCampoModel, index:number){          
        return (
            <ZCampo zCampoModel={zCampoModel} />
        );
    }

    render(){

        let { zRecursoModel } = this.props;

        return (
            <div>
                {zRecursoModel.camps.map(this.renderZCampo)}
            </div>
        );
    }
}