import * as React from 'react';

import {
    Col,
    Checkbox,
    FormGroup
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

export class ZCampoCheckbox extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.sincronizarCampo = this.sincronizarCampo.bind(this);
    }

    render(): any {

        const { zCampoModel } = this.props;

        return (
            <FormGroup>
                <Checkbox
                    name={zCampoModel.nomCmp}
                    value={zCampoModel.lon}
                    onChange={this.sincronizarCampo}
                >
                    {zCampoModel.etq.replace("[ ]", "")}
                </Checkbox>
            </FormGroup>
        );
    }

    sincronizarCampo(e: any) {
        let buffer = `<nc>${this.props.zCampoModel.nomCmp}</nc><vc>${e.target.checked ? "X" : " "}</vc><pb>${this.props.zCampoModel.lon}</pb>`;
        this.props.sincronizarCampo(buffer);
    }
}