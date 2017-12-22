import * as React from 'react';

import {
    FormGroup,
    FormControl,
    Col,
    ControlLabel
} from 'react-bootstrap';

import {
    ZCampoModel, IZCampo
} from "../../zcommon";

interface OwnProperties {
    zCampoModel: IZCampo;
}

interface OwnState {
    hasChanged:boolean;
    value:string;
}

export default class ZCampoTextbox extends React.PureComponent<OwnProperties, OwnState>
{

    constructor(props: OwnProperties){
        super(props);

        this.state = {
            hasChanged:false,
            value : ""
        } as OwnState;

        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { zCampoModel } = this.props;
        return (
            <FormGroup controlId={zCampoModel.nomCmp} bsSize="small">
                <Col md={12}>
                    <Col componentClass={ControlLabel}>
                        {zCampoModel.etq}
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            name={zCampoModel.nomCmp}
                            onChange={this.onChange}
                            onBlur={this.handleChange}                            
                        />
                    </Col>
                </Col>
            </FormGroup>
        );
    }
    
    handleChange(e:any){
        if(this.state.hasChanged && this.state.value != e.target.value){
            this.setState({
                value : e.target.value
            } as OwnState);
            console.log("evt changed.");
        }
    }

    onChange(e:any){
        this.setState({
            hasChanged:true
        } as OwnState);    
    }    
}
