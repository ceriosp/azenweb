import * as React from 'react';

import {
    ButtonToolbar,
    Button
} from 'react-bootstrap';

import * as ZCommon from "../../zcommon";
import {
    ZCampoModel
} from "../../zcommon";

import ZCampoButton from './ZCampoButton';

interface OwnProperties {
    zcamposBotonesComandosList: Array<ZCampoModel>,
    zcamposBotonesLineaList: Array<ZCampoModel>
}

export default class ZBarraBotones extends React.PureComponent<OwnProperties, void>
{
    render() {
        const { zcamposBotonesComandosList, zcamposBotonesLineaList } = this.props;
        return (
            <div className="well">
                <ButtonToolbar>
                    {zcamposBotonesComandosList.map((zcampoBoton: ZCampoModel, index: number) => {
                        return (
                            <ZCampoButton
                                key={index}
                                zCampoModel={zcampoBoton}
                                tipoBoton={ZCommon.Constants.TipoBoton.Comando} />
                        );
                    })}
                </ButtonToolbar>
                <ButtonToolbar>
                    {zcamposBotonesLineaList.map((zcampoBoton: ZCampoModel, index: number) => {
                        return (
                            <ZCampoButton
                                key={index}
                                zCampoModel={zcampoBoton}
                                tipoBoton={ZCommon.Constants.TipoBoton.Linea} />
                        );
                    })}
                </ButtonToolbar>
            </div>
        );
    }
}
