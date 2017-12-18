import * as React from 'react';

import {
    CSSProperties
} from 'react';

import { IZFormaTabla } from '../../zcommon/contracts';
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
    render(): any {
        const { zFormaTabla } = this.props;
        return (
            <div
                id={Constants.PX_PREFIJO_ID + this.props.pxAlTope + Constants.REG_PREFIJO_ID + this.props.zRegionIndex}
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
