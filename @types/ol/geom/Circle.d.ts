import { Coordinate } from '../coordinate';
import { EventsKey } from '../events';
import BaseEvent from '../events/Event';
import { ObjectEvent } from '../Object';
import { ProjectionLike } from '../proj';
import Geometry from './Geometry';
import GeometryLayout from './GeometryLayout';
import SimpleGeometry from './SimpleGeometry';

export default class Circle extends SimpleGeometry {
    constructor(center: Coordinate, opt_radius?: number, opt_layout?: GeometryLayout);
    getCenter(): Coordinate;
    getRadius(): number;
    setCenter(center: Coordinate): void;
    setCenterAndRadius(center: Coordinate, radius: number, opt_layout?: GeometryLayout): void;
    setRadius(radius: number): void;
    transform(source: ProjectionLike, destination: ProjectionLike): Circle;
    transform(source: ProjectionLike, destination: ProjectionLike): Geometry;
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
