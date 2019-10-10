import { Coordinate } from '../coordinate';
import { EventsKey } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { ObjectEvent } from '../Object';
import Circle from './Circle';
import GeometryLayout from './GeometryLayout';
import LinearRing from './LinearRing';
import Point from './Point';
import SimpleGeometry from './SimpleGeometry';

export default class Polygon extends SimpleGeometry {
    constructor(coordinates: Coordinate[][] | number[], opt_layout?: GeometryLayout, opt_ends?: number[]);
    appendLinearRing(linearRing: LinearRing): void;
    getArea(): number;
    getEnds(): number[];
    getFlatInteriorPoint(): number[];
    getInteriorPoint(): Point;
    getLinearRing(index: number): LinearRing;
    getLinearRingCount(): number;
    getLinearRings(): LinearRing[];
    getOrientedFlatCoordinates(): number[];
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
export function circular(center: Coordinate, radius: number, opt_n?: number, opt_sphereRadius?: number): Polygon;
export function fromCircle(circle: Circle, opt_sides?: number, opt_angle?: number): Polygon;
export function fromExtent(extent: Extent): Polygon;
export function makeRegular(polygon: Polygon, center: Coordinate, radius: number, opt_angle?: number): void;
