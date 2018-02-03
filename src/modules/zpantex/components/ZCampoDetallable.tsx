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
    IZCampo,
    Constants as ZCommonConstants,
    IZCampoState
} from "../../zcommon";

interface OwnProps {
    zCampoModel: IZCampoState;    
}

export default class ZCampoDetallable extends React.PureComponent<OwnProps, void>
{
    constructor(props:OwnProps){
        super(props);

        this.onCampoZoomClick = this.onCampoZoomClick.bind(this);
    }

    render() {
        const zcampoModel = this.props.zCampoModel;
        return (
            <FormGroup controlId={zcampoModel.nomCmp} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zcampoModel.etq}
                    </Col>
                    <Col>
                        <InputGroup>
                            <FormControl type="text" />
                            <InputGroup.Addon style={{cursor:"pointer"}}>
                                <Glyphicon glyph="list"/>
                            </InputGroup.Addon>                            
                        </InputGroup>
                    </Col>
                </Col>
            </FormGroup>
        );
    }

    onCampoZoomClick(){
        
    }
}
