import * as React from 'react';

import {
    Col,
    Panel,
    Checkbox
} from 'react-bootstrap';

import * as ZRecursos from "../../zpantex";

import {
    IZCampo,
    IZFormaTabla
} from "../../zcommon";

import ZCampo from './ZCampo';

interface OwnProperties {
    zFormaTabla: IZFormaTabla;
    zCampoGrafico: IZCampo;
}

export default class ZCampoGrafico extends React.PureComponent<OwnProperties, undefined>
{
    public static defaultProps: Partial<OwnProperties> = {

    };

    render() {

        const { zFormaTabla, zCampoGrafico } = this.props;

        return (
            <Panel header={zCampoGrafico.etq.replace("@R", "")} bsStyle="info">
                {zCampoGrafico.cmps.map((zCampoI: IZCampo, index: number) => {
                    return (
                        <Col xs={12} sm={4} md={4} key={index}>
                            {
                                <ZCampo
                                    zCampo={zCampoI}
                                    zFormaTabla={zFormaTabla}
                                />
                            }
                        </Col>
                    );
                })}
            </Panel>
        );
    }
}