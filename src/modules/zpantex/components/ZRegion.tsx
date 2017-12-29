import * as React from 'react';

import {
    CSSProperties
} from 'react';

import { IZFormaTabla } from '../../zcommon/contracts';
import { Services as ZCommonServices } from "../../zcommon/services";
import { ZFormaTablaContainer } from "../containers/ZFormaTablaContainer";
import { Constants } from "../constants";

export interface OwnProps {
    zFormaTabla: IZFormaTabla;
    zRegionIndex: number;
    px: number;
}

export interface ConnectedState {
    pxAlTope: number;
}

export interface ConnectedDispatch {
}

export class ZRegion extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    private commonServices: ZCommonServices.ZCommonServices;;

    constructor(props: OwnProps & ConnectedState & ConnectedDispatch) {
        super(props);

        this.commonServices = new ZCommonServices.ZCommonServices();
    }

    render(): any {
        const { zFormaTabla } = this.props;
        return (
            <div
                id={this.commonServices.getZRegionId(this.props.pxAlTope, this.props.zRegionIndex, false)}
            >
                <ZFormaTablaContainer
                    zFormaTabla={zFormaTabla}
                    zFormaIndex={this.props.zRegionIndex}
                    px={this.props.px}
                />
            </div>
        );
    }
}
