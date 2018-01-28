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
    IZFormaTablaState
} from "../../zcommon";

import ZCampo from './ZCampo';

interface OwnProperties {
    zFormaTabla: IZFormaTablaState;
    zCampoGrafico: IZCampoState;    

    px: number;
    zftIndex: number;
}

export default class ZCampoGrafico extends React.PureComponent<OwnProperties, undefined>
{
    public static defaultProps: Partial<OwnProperties> = {

    };

    render() {

        const { zFormaTabla, zCampoGrafico } = this.props;

        return (
            <Panel header={zCampoGrafico.etq.replace("@R", "")} bsStyle="info">
                {zCampoGrafico.cmpsState.map((zCampoI: IZCampoState, index: number) => {
                    return (
                        <Col key={zCampoI.id} xs={12} sm={4} md={4}>
                            <ZCampo                                
                                zCampo={zCampoI}                                
                                zFormaTabla={zFormaTabla}
                                px={this.props.px}
                                zftIndex={this.props.zftIndex}
                            />
                        </Col>
                    );
                })}
            </Panel>
        );
    }
}