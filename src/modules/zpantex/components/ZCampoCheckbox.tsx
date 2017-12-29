import * as React from 'react';

import {
    Col,
    Checkbox
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo
} from "../../zcommon";

export interface OwnProps {
    zCampoModel: IZCampo;
}

export interface ConnectedState {
}

export interface ConnectedDispatch {
    sincronizarCampo: (buffer: string) => void;
}

export class ZCampoCheckbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private buffer: string;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.sincronizarCampo = this.sincronizarCampo.bind(this);
    }

    render(): any {

        const { zCampoModel } = this.props;

        return (
            <Checkbox
                name={zCampoModel.nomCmp}
                value={zCampoModel.lon}
                onChange={this.sincronizarCampo}
            >
                {zCampoModel.etq.replace("[ ]", "")}
            </Checkbox>
        );
    }

    sincronizarCampo(e: any) {
        this.buffer = `<nc>${this.props.zCampoModel.nomCmp}</nc><vc>${e.target.checked ? "X" : " "}</vc><pb>${this.props.zCampoModel.lon}</pb>`;
        this.props.sincronizarCampo(this.buffer);
    }
}