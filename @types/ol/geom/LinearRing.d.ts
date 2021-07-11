import { ObjectEvent } from '../Object';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import GeometryLayout from './GeometryLayout';
import GeometryType from './GeometryType';
import SimpleGeometry from './SimpleGeometry';

export default class LinearRing extends SimpleGeometry {
    constructor(coordinates: Coordinate[] | number[], opt_layout?: GeometryLayout);
    protected getSimplifiedGeometryInternal(squaredTolerance: number): LinearRing;
    /**
     * Make a complete copy of the geometry.
     */
    clone(): LinearRing;
    closestPointXY(x: number, y: number, closestPoint: Coordinate, minSquaredDistance: number): number;
    /**
     * Return the area of the linear ring on projected plane.
     */
    getArea(): number;
    /**
     * Return the coordinates of the linear ring.
     */
    getCoordinates(): Coordinate[];
    /**
     * Get the type of this geometry.
     */
    getType(): GeometryType;
    /**
     * Test if the geometry and the passed extent intersect.
     */
    intersectsExtent(extent: Extent): boolean;
    /**
     * Set the coordinates of the linear ring.
     */
    setCoordinates(coordinates: Coordinate[], opt_layout?: GeometryLayout): void;
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
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
