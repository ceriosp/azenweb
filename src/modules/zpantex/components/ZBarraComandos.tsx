import * as React from 'react';

import {
    ButtonToolbar,
    Button,
    Well
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZCampoModel, IZComandoForma
} from "../../zcommon";

import ZCampoButton from './ZCampoButton';

interface OwnProperties {
    zComandosList: Array<IZComandoForma>,
}

export default class ZBarraComandos extends React.PureComponent<OwnProperties, undefined>
{
    render() {
        const { zComandosList } = this.props;
        return (
            <Well bsSize="small">
                <ButtonToolbar>
                    {zComandosList.map((zComandoI: IZComandoForma, index: number) => {
                        return (
                            <Button
                                key={index}
                            >
                                {zComandoI.etq}
                            </Button>
                        );
                    })}
                </ButtonToolbar>
            </Well>
        );
    }
}
