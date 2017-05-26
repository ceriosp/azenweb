import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel,
    InputGroup,
    Button,
    Glyphicon
} from 'react-bootstrap';

import {
    ZCampoModel,
    ZReferenciaModel,
    ZReferenciaViewModel
} from "../../zcommon";

interface OwnProps {
    zcampoModel: ZCampoModel;
    zreferenciaViewModel:ZReferenciaViewModel;
    onCampoZoomClick?:(zreferenciaViewModel:ZReferenciaViewModel) => void
}

export default class ZCampoZoom extends React.Component<OwnProps, void>
{
    constructor(props:OwnProps){
        super(props);

        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {
        const { zcampoModel } = this.props;
        return (
            <FormGroup controlId={zcampoModel.nomCmp} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zcampoModel.etq}
                    </Col>
                    <Col>
                        <InputGroup>
                            <FormControl type="text" />
                            <InputGroup.Addon style={{cursor:"pointer"}} onClick={this.onCampoZoomClick}>
                                <Glyphicon glyph="list"/>
                            </InputGroup.Addon>                            
                        </InputGroup>
                    </Col>
                </Col>
            </FormGroup>
        );
    }

    onCampoZoomClick(){
        if(this.props.onCampoZoomClick){
            this.props.onCampoZoomClick(this.props.zreferenciaViewModel)
        }
    }
}
