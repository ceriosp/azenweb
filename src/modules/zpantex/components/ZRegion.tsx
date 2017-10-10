import * as React from 'react';

import {
    CSSProperties
} from 'react';

import { IZFormaTabla } from '../../zcommon/contracts';
import { ZFormaTabla } from "./ZFormaTabla";

export interface OwnProps {
    zFormaTabla: IZFormaTabla;
}

export interface ConnectedState {
}

export interface ConnectedDispatch {
}

export class ZRegion extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, undefined>
{
    render(): any {
        const { zFormaTabla } = this.props;
        return (
            <div>
                <ZFormaTabla
                    zFormaTabla={zFormaTabla}
                />
            </div>
        );
    }
}
