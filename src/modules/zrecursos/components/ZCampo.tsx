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
    ZReferenciaViewModel
} from "../../zcommon";

import * as ZRecursos from "../../zrecursos";

import ZTextbox from './ZTextbox';
import ZRadio from './ZRadio';
import ZCheckbox from './ZCheckbox';
import ZRegion from './ZRegion';
import ZCampoZoom from './ZCampoZoom';

interface OwnProperties {
    zrecursoViewModel: ZRecursoViewModel;
    zcampoModel: ZCampoModel;
    esCheckboxAislado?: boolean; //Si es checkbox group = true, sirve un sólo checkbox = false. Ej. ter.noActivo        
    zcamposEnRegionList?: Array<ZCampoModel>;

    onCampoZoomClick?: (zreferenciaViewModel: ZReferenciaViewModel) => void
}

export default class ZCampo extends React.Component<OwnProperties, void>
{
    private isRegion: boolean = false;

    render() {
        const { zcampoModel, esCheckboxAislado } = this.props;
        const claseInd: number = zcampoModel.claseInd;

        let zCampoComponent = this.getZCampoComponent();

        return (
            <div>
                {zCampoComponent}
            </div>
        );
    }

    getZCampoComponent(): any {
        const {
            zrecursoViewModel,
            zcampoModel,
            esCheckboxAislado,
            zcamposEnRegionList } = this.props;

        const { claseInd, nomCmp } = zcampoModel;

        const esRegion: boolean = zcamposEnRegionList && zcamposEnRegionList.length > 0;

        if (esRegion) {
            return <ZRegion
                zrecursoViewModel={zrecursoViewModel}
                zCampoRegion={zcampoModel}
                zcamposEnRegionList={zcamposEnRegionList} />;
        }
        else if (zrecursoViewModel.mapZoomsIdsIndxByCampo.has(zcampoModel.nomCmp)) {
            return <ZCampoZoom
                zcampoModel={zcampoModel}
                zreferenciaViewModel={zrecursoViewModel.mapZoomsIdsIndxByCampo.get(zcampoModel.nomCmp)}
                onCampoZoomClick={this.props.onCampoZoomClick} />
        }
        else if (claseInd == ZCommon.Constants.CAMPO_TEXTO) {
            return <ZTextbox zCampoModel={zcampoModel} />;
        }
        else if (claseInd == ZCommon.Constants.CAMPO_RADIO && esCheckboxAislado) {
            return <div style={{ marginBottom: "10px" }}><ZCheckbox zCampoModel={zcampoModel} /> </div>;
        }
        else if (claseInd == ZCommon.Constants.CAMPO_RADIO) {
            return <ZRadio zCampoModel={zcampoModel} />;
        }
        else if (claseInd == ZCommon.Constants.CAMPO_CHECKBOX) {
            return <ZCheckbox zCampoModel={zcampoModel} />;
        }
    }
}