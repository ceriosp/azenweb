import * as React from 'react';

import {
    Radio
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo, IZCampoState
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
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
                value={zCampoModel.lon}                
                onClick={this.sincronizarCampo}
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