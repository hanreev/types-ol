import { ObjectEvent } from '../Object';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { TransformFunction } from '../proj';
import Geometry, { Type } from './Geometry';

export type TGeometryCollectionBaseEventTypes = 'change' | 'error';
export type TGeometryCollectionObjectEventTypes = 'propertychange';
export default class GeometryCollection extends Geometry {
    constructor(geometries?: Geometry[]);
    protected computeExtent(extent: Extent): Extent;
    /**
     * Apply a transform function to the coordinates of the geometry.
     * The geometry is modified in place.
     * If you do not want the geometry modified in place, first clone() it and
     * then use this function on the clone.
     */
    applyTransform(transformFn: TransformFunction): void;
    /**
     * Make a complete copy of the geometry.
     */
    clone(): GeometryCollection;
    closestPointXY(x: number, y: number, closestPoint: Coordinate, minSquaredDistance: number): number;
    containsXY(x: number, y: number): boolean;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    /**
     * Return the geometries that make up this geometry collection.
     */
    getGeometries(): Geometry[];
    getGeometriesArray(): Geometry[];
    getGeometriesArrayRecursive(): Geometry[];
    /**
     * Create a simplified version of this geometry using the Douglas Peucker algorithm.
     */
    getSimplifiedGeometry(squaredTolerance: number): GeometryCollection;
    /**
     * Get the type of this geometry.
     */
    getType(): Type;
    /**
     * Test if the geometry and the passed extent intersect.
     */
    intersectsExtent(extent: Extent): boolean;
    isEmpty(): boolean;
    /**
     * Rotate the geometry around a given coordinate. This modifies the geometry
     * coordinates in place.
     */
    rotate(angle: number, anchor: Coordinate): void;
    /**
     * Scale the geometry (with an optional origin).  This modifies the geometry
     * coordinates in place.
     */
    scale(sx: number, sy?: number, anchor?: Coordinate): void;
    /**
     * Set the geometries that make up this geometry collection.
     */
    setGeometries(geometries: Geometry[]): void;
    setGeometriesArray(geometries: Geometry[]): void;
    /**
     * Get a transformed and simplified version of the geometry.
     */
    simplifyTransformed(squaredTolerance: number, transform?: TransformFunction): Geometry;
    /**
     * Translate the geometry.  This modifies the geometry coordinates in place.  If
     * instead you want a new geometry, first clone() this geometry.
     */
    translate(deltaX: number, deltaY: number): void;
    on(type: TGeometryCollectionBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TGeometryCollectionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TGeometryCollectionBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TGeometryCollectionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TGeometryCollectionBaseEventTypes | TGeometryCollectionBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TGeometryCollectionObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TGeometryCollectionObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TGeometryCollectionObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TGeometryCollectionObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TGeometryCollectionObjectEventTypes | TGeometryCollectionObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
