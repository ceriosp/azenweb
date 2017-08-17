import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Row,
    Col,
    ControlLabel
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

import ZCampoTextbox from './ZCampoTextbox';
import ZCampoRadio from './ZCampoRadio';
import ZCampoCheckbox from './ZCampoCheckbox';
import ZCampoGrafico from './ZCampoGrafico';
import ZCampoZoom from './ZCampoZoom';

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
            return <ZCampoGrafico zCampoGrafico={zCampo} zFormaTabla={zFormaTabla}  />
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_NOINDICADOR) {
            return <ZCampoTextbox zCampoModel={zCampo} />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_RADIO) {
            return <ZCampoRadio zCampoModel={zCampo} />;
        }
        else if (claseInd == ZCommon.Constants.ClaseIndicadorEnum.ZCMP_CHEQUEO) {
            return <ZCampoCheckbox zCampoModel={zCampo} />;
        }
    }
}