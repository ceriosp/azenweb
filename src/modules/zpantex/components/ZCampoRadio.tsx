import * as React from 'react';

import {
    Radio
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo, IZCampoState,
    Constants as ZCommonConstants,
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
    estaProcesandoRequestServidor:boolean
}

export interface ConnectedDispatch {
    sincronizarCampo: (buffer: string) => void;
}

export class ZCampoRadio extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private buffer: string;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.sincronizarCampo = this.sincronizarCampo.bind(this);
    }

    render() {

        const { zCampoModel } = this.props;

        return (
            <Radio
                inline
                name={zCampoModel.nomCmp}
                checked={zCampoModel.lon == zCampoModel.lonv}
                value={zCampoModel.lon}                
                onClick={this.sincronizarCampo}
                disabled={
                    this.props.estaProcesandoRequestServidor
                    || zCampoModel.controlCampo == ZCommonConstants.ControlCampoEnum.ZCMP_VISUAL
                    || zCampoModel.modoCampo == ZCommonConstants.ModoCampoEnum.ZCMP_MSOLOVISUAL
                    || zCampoModel.modoCampo == ZCommonConstants.ModoCampoEnum.ZCMP_MNOARRIVABLE                                
                }
    
            >
                {zCampoModel.etq.replace("( )", "")}
            </Radio>
        );
    }

    sincronizarCampo(e: any) {
        this.buffer = `<nc>${this.props.zCampoModel.nomCmp}</nc><vc>*</vc><pb>${this.props.zCampoModel.lon}</pb>`;
        this.props.sincronizarCampo(this.buffer);
    }
}