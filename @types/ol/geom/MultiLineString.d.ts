import { Coordinate } from '../coordinate';
import { EventsKey } from '../events';
import BaseEvent from '../events/Event';
import { ObjectEvent } from '../Object';
import GeometryLayout from './GeometryLayout';
import LineString from './LineString';
import SimpleGeometry from './SimpleGeometry';

export default class MultiLineString extends SimpleGeometry {
    constructor(
        coordinates: (Coordinate[] | LineString)[] | number[],
        opt_layout?: GeometryLayout,
        opt_ends?: number[],
    );
    appendLineString(lineString: LineString): void;
    getCoordinateAtM(m: number, opt_extrapolate?: boolean, opt_interpolate?: boolean): Coordinate;
    getEnds(): number[];
    getFlatMidpoints(): number[];
    getLineString(index: number): LineString;
    getLineStrings(): LineString[];
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
}
