import { ObjectEvent } from '../Object';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import GeometryLayout from './GeometryLayout';
import GeometryType from './GeometryType';
import MultiPoint from './MultiPoint';
import Polygon from './Polygon';
import SimpleGeometry from './SimpleGeometry';

export default class MultiPolygon extends SimpleGeometry {
    constructor(
        coordinates: (Coordinate[][] | Polygon)[] | number[],
        opt_layout?: GeometryLayout,
        opt_endss?: number[][],
    );
    protected getSimplifiedGeometryInternal(squaredTolerance: number): MultiPolygon;
    /**
     * Append the passed polygon to this multipolygon.
     */
    appendPolygon(polygon: Polygon): void;
    /**
     * Make a complete copy of the geometry.
     */
    clone(): MultiPolygon;
    closestPointXY(x: number, y: number, closestPoint: Coordinate, minSquaredDistance: number): number;
    containsXY(x: number, y: number): boolean;
    /**
     * Return the area of the multipolygon on projected plane.
     */
    getArea(): number;
    /**
     * Get the coordinate array for this geometry.  This array has the structure
     * of a GeoJSON coordinate array for multi-polygons.
     */
    getCoordinates(opt_right?: boolean): Coordinate[][][];
    getEndss(): number[][];
    getFlatInteriorPoints(): number[];
    /**
     * Return the interior points as {@link module:ol/geom/MultiPoint multipoint}.
     */
    getInteriorPoints(): MultiPoint;
    getOrientedFlatCoordinates(): number[];
    /**
     * Return the polygon at the specified index.
     */
    getPolygon(index: number): Polygon;
    /**
     * Return the polygons of this multipolygon.
     */
    getPolygons(): Polygon[];
    /**
     * Get the type of this geometry.
     */
    getType(): GeometryType;
    /**
     * Test if the geometry and the passed extent intersect.
     */
    intersectsExtent(extent: Extent): boolean;
    /**
     * Set the coordinates of the multipolygon.
     */
    setCoordinates(coordinates: Coordinate[][][], opt_layout?: GeometryLayout): void;
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
