import * as React from 'react';

import {
    Col,
    Panel,
    Checkbox
} from 'react-bootstrap';

import * as ZRecursos from "../../zpantex";

import {
    IZCampo,
    IZFormaTabla,
    IZCampoState,
    IZFormaTablaState,
    Constants as ZCommonConstants
} from "../../zcommon";

import ZCampo from './ZCampo';

interface OwnProperties {
    zFormaTabla: IZFormaTablaState;
    tipoCmdPantex:ZCommonConstants.ComandoEnum;
    zCampoGrafico: IZCampoState;
}

export default class ZCampoGrafico extends React.PureComponent<OwnProperties, undefined>
{
    public static defaultProps: Partial<OwnProperties> = {

    };

    render() {

        const { zFormaTabla, zCampoGrafico } = this.props;

        if (zCampoGrafico.etq == "@Rjuntura") {
            if(zCampoGrafico.cmpsState.length == 2){
                return (
                    <Panel bsStyle="info">
                        {zCampoGrafico.cmpsState && zCampoGrafico.cmpsState.map((zCampoI: IZCampoState, index: number) => {
                            if(index == 0){
                                return (
                                    <Col key={zCampoI.id} xs={12} sm={4} md={4}>
                                        <ZCampo
                                            zCampo={zCampoI}
                                            zFormaTabla={zFormaTabla}
                                            tipoCmdPantex={this.props.tipoCmdPantex}
                                        />
                                    </Col>
                                );                                    
                            }
                            return (
                                <Col key={zCampoI.id} xs={12} sm={4} md={8}>
                                    <ZCampo
                                        zCampo={zCampoI}
                                        zFormaTabla={zFormaTabla}
                                        tipoCmdPantex={this.props.tipoCmdPantex}
                                    />
                                </Col>
                            );
                        })}
                    </Panel>
                );                    
            }

            return (
                <Panel bsStyle="info">
                    {zCampoGrafico.cmpsState && zCampoGrafico.cmpsState.map((zCampoI: IZCampoState, index: number) => {
                        return (
                            <Col key={zCampoI.id} xs={12} sm={4} md={12/zCampoGrafico.cmpsState.length}>
                                <ZCampo
                                    zCampo={zCampoI}
                                    zFormaTabla={zFormaTabla}
                                    tipoCmdPantex={this.props.tipoCmdPantex}
                                />
                            </Col>
                        );
                    })}
                </Panel>
            );
        }

        return (
            <Panel header={zCampoGrafico.etq.replace("@R", "")} bsStyle="info">
                {zCampoGrafico.cmpsState && zCampoGrafico.cmpsState.map((zCampoI: IZCampoState, index: number) => {
                    return (
                        <Col key={zCampoI.id} xs={12} sm={4} md={12 / zCampoGrafico.cmpsState.length}>
                            <ZCampo
                                zCampo={zCampoI}
                                zFormaTabla={zFormaTabla}
                                tipoCmdPantex={this.props.tipoCmdPantex}
                            />
                        </Col>
                    );
                })}
            </Panel>
        );
    }
}