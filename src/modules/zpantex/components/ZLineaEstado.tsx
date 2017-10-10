import * as React from 'react';

import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    Well
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZCampoModel, IZComandoForma
} from "../../zcommon";

import ZCampoButton from './ZCampoButton';

interface OwnProperties {
    linEst: Array<IZComandoForma>
}

export default class ZLineaEstado extends React.PureComponent<OwnProperties, undefined>
{
    render() {
        const { linEst } = this.props;
        return (
            <div
                style={{
                    marginBottom: "10px"
                }}
            >
                <ButtonGroup bsSize="small">
                    {linEst.map((zComandoI: IZComandoForma, index: number) => {
                        return (
                            <Button
                                key={index}
                                bsStyle="info"
                                disabled={zComandoI.desh == 1 || (zComandoI.etq == "" || zComandoI.etq == null)}
                            >
                                {(zComandoI.etq == "" || zComandoI.etq == null) ? "Vacio" : zComandoI.etq}
                            </Button>
                        );
                    })}
                </ButtonGroup>
            </div>
        );
    }
}