import { ObjectEvent } from 'ol/Object';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import GeometryLayout from 'ol/geom/GeometryLayout';
import GeometryType from 'ol/geom/GeometryType';
import Point from 'ol/geom/Point';
import SimpleGeometry from 'ol/geom/SimpleGeometry';

export default class MultiPoint extends SimpleGeometry {
    constructor(coordinates: Coordinate[] | number[], opt_layout?: GeometryLayout);
    /**
     * Append the passed point to this multipoint.
     */
    appendPoint(point: Point): void;
    /**
     * Make a complete copy of the geometry.
     */
    clone(): MultiPoint;
    closestPointXY(x: number, y: number, closestPoint: Coordinate, minSquaredDistance: number): number;
    /**
     * Return the coordinates of the multipoint.
     */
    getCoordinates(): Coordinate[];
    /**
     * Return the point at the specified index.
     */
    getPoint(index: number): Point;
    /**
     * Return the points of this multipoint.
     */
    getPoints(): Point[];
    /**
     * Get the type of this geometry.
     */
    getType(): GeometryType;
    /**
     * Test if the geometry and the passed extent intersect.
     */
    intersectsExtent(extent: Extent): boolean;
    /**
     * Set the coordinates of the multipoint.
     */
    setCoordinates(coordinates: Coordinate[], opt_layout?: GeometryLayout): void;
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
