import * as React from 'react';

import {
    FormGroup,
    Col,
    ControlLabel,
    Glyphicon
} from 'react-bootstrap';

import {
    Constants as ZCommonConstants,
    IZCampoState,
    IZFormaTablaState,
    IZComandoFormaState
} from "../../zcommon";
import { ZCampoTextoBasicoContainer } from '../containers/ZCampoTextoBasicoContainer';

export interface OwnProps {
    zCampoModel: IZCampoState;
}

export interface ConnectedState {
    
}

export interface ConnectedDispatch {
    despacharComando : (zcomandoFormaState: IZComandoFormaState)=> void;
}

export class ZLabelCampo extends React.PureComponent<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private etiquetasAIgnorar:Array<string>;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);
        this.etiquetasAIgnorar = ["Que", "Por campo"];
    }

    render() {
        const { zCampoModel } = this.props;

        return (
            <Col componentClass={ControlLabel}>
                {(zCampoModel.autoFocus && 
                    zCampoModel.etq.length > 0 
                    && this.etiquetasAIgnorar.indexOf(zCampoModel.etq.trim()) == -1) &&
                    <span>
                        <Glyphicon 
                            style={{ 
                                color: "rgb(51, 122, 183)", 
                                marginRight:"3px",
                                cursor: "pointer"
                            }} 
                            glyph="search" 
                            onClick={()=>{
                                this.props.despacharComando({
                                    cmd:ZCommonConstants.ComandoEnum.CM_BUSCAR,
                                    px:zCampoModel.px,
                                    idZft:zCampoModel.idZft
                                } as IZComandoFormaState);
                            }}
                            title={"Buscar por " + zCampoModel.etq}
                        />
                    </span>                    
                }
                {zCampoModel.etq}
            </Col>
        );
    }
}