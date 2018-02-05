import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Row,
    Col,
    ControlLabel,
    Label
} from 'react-bootstrap';


import * as ZCommon from "../../zcommon";
import {
    IZCampoState,
    IZFormaTablaState
} from "../../zcommon";

import * as ZRecursos from "../../zpantex";

import ZCampoGrafico from './ZCampoGrafico';
import { ZCampoRadioContainer } from '../containers/ZCampoRadioContainer';
import { ZCampoCheckboxContainer } from '../containers/ZCampoCheckboxContainer';
import { ZCampoTextboxContainer } from '../containers/ZCampoTextboxContainer';
import { ZCampoDetallableContainer } from '../containers/ZCampoDetallableContainer';

interface OwnProperties {
    zFormaTabla: IZFormaTablaState;
    zCampo: IZCampoState;
    /*
    esCheckboxAislado?: boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo        
    zcamposEnRegionList?: Array<ZCampoModel>;

    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void
    */
}

export default class ZCampo extends React.PureComponent<OwnProperties, undefined>
{
    private isRegion: boolean = false;

    constructor(props: OwnProperties) {
        super(props);
        console.log("instancing 1 zcampo " + this.props.zCampo.px + " - " + this.props.zCampo.nomCmp + " - " + this.props.zFormaTabla.venState.descr);
    }

    render() {

        console.log("rendering 1 zcampo " + this.props.zCampo.px + " - " + this.props.zCampo.nomCmp + " - " + this.props.zFormaTabla.venState.descr);

        const { zCampo } = this.props;
        const claseInd: number = zCampo.claseInd;

        let zCampoComponent = this.getZCampoComponent();

        return (
            <div>
                {zCampoComponent}
            </div>
        );
    }

    getZCampoComponent(): any {
        const {
            zFormaTabla,
            zCampo,
        } = this.props;

        const { claseInd, nomCmp, cmpsState, esCampoGrafico, esDetallable } = zCampo;

        if (esCampoGrafico) {
            return <ZCampoGrafico
                zCampoGrafico={zCampo}
                zFormaTabla={zFormaTabla}
            />
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
            if (esDetallable) {
                return <ZCampoDetallableContainer
                    zCampoModel={zCampo}
                />;
            }
            return <ZCampoTextboxContainer
                zCampoModel={zCampo}
                zFormaTabla={zFormaTabla}
            />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_RADIO) {
            return <ZCampoRadioContainer
                zCampoModel={zCampo}
            />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
            return <ZCampoCheckboxContainer
                zCampoModel={zCampo}
            />;
        } else {
            return <span>{zCampo.etq}</span>;
        }
    }
}