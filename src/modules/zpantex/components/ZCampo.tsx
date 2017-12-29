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
    ZRecursoViewModel,
    ZCampoModel,
    ZReferenciaViewModel,
    IZPantex,
    IZCampo,
    IZFormaTabla
} from "../../zcommon";

import * as ZRecursos from "../../zpantex";

import ZCampoZoom from './ZCampoZoom';
import ZCampoGrafico from './ZCampoGrafico';
import { ZCampoRadioContainer } from '../containers/ZCampoRadioContainer';
import { ZCampoCheckboxContainer } from '../containers/ZCampoCheckboxContainer';
import { ZCampoTextboxContainer } from '../containers/ZCampoTextboxContainer';

interface OwnProperties {
    zFormaTabla: IZFormaTabla;
    zCampo: IZCampo;
    /*
    esCheckboxAislado?: boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo        
    zcamposEnRegionList?: Array<ZCampoModel>;

    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void
    */
}

export default class ZCampo extends React.PureComponent<OwnProperties, undefined>
{
    private isRegion: boolean = false;

    render() {
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

        const { claseInd, nomCmp, cmps } = zCampo;

        if (cmps) {
            return <ZCampoGrafico zCampoGrafico={zCampo} zFormaTabla={zFormaTabla} />
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
            return <ZCampoTextboxContainer zCampoModel={zCampo} />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_RADIO) {
            return <ZCampoRadioContainer zCampoModel={zCampo} />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
            return <ZCampoCheckboxContainer zCampoModel={zCampo} />;
        } else {
            return <span>{zCampo.etq}</span>;
        }
    }
}