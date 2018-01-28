import * as React from 'react';

import {
    CSSProperties
} from 'react';

import { IZFormaTabla, IZFormaTablaState } from '../../zcommon/contracts';
import { Services as ZCommonServices } from "../../zcommon/services";
import { ZFormaTablaContainer } from "../containers/ZFormaTablaContainer";
import { Constants } from "../constants";

export interface OwnProps {
    zFormaTabla: IZFormaTablaState;
    zRegionIndex: number;
    px: number;
}

export interface ConnectedDispatch {
}

export interface ConnectedState {
}

export class ZRegion extends React.PureComponent<OwnProps & ConnectedDispatch, undefined>
{
    private commonServices: ZCommonServices.ZCommonServices;;

    constructor(props: OwnProps & ConnectedDispatch) {
        super(props);

        this.commonServices = new ZCommonServices.ZCommonServices();
    }

    render(): any {
        const { zFormaTabla } = this.props;
        return (
            <div>
                <ZFormaTablaContainer
                    zFormaTabla={zFormaTabla}
                    zFormaIndex={this.props.zRegionIndex}
                    px={this.props.px}
                />
            </div>
        );
    }
}
