import { Coordinate } from '../coordinate';
import { EventsKey } from '../events';
import BaseEvent from '../events/Event';
import { ObjectEvent } from '../Object';
import GeometryLayout from './GeometryLayout';
import MultiPoint from './MultiPoint';
import Polygon from './Polygon';
import SimpleGeometry from './SimpleGeometry';

export default class MultiPolygon extends SimpleGeometry {
    constructor(
        coordinates: (Coordinate[][] | Polygon)[] | number[],
        opt_layout?: GeometryLayout,
        opt_endss?: number[][],
    );
    appendPolygon(polygon: Polygon): void;
    getArea(): number;
    getEndss(): number[][];
    getFlatInteriorPoints(): number[];
    getInteriorPoints(): MultiPoint;
    getOrientedFlatCoordinates(): number[];
    getPolygon(index: number): Polygon;
    getPolygons(): Polygon[];
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
