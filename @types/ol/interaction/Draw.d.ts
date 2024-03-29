import Collection from '../Collection';
import Feature from '../Feature';
import Map from '../Map';
import MapBrowserEvent from '../MapBrowserEvent';
import { ObjectEvent } from '../Object';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Condition } from '../events/condition';
import Geometry, { GeometryLayout, Type } from '../geom/Geometry';
import LineString from '../geom/LineString';
import SimpleGeometry from '../geom/SimpleGeometry';
import VectorLayer from '../layer/Vector';
import { Pixel } from '../pixel';
import Projection from '../proj/Projection';
import VectorSource from '../source/Vector';
import { StyleLike } from '../style/Style';
import { FlatStyleLike } from '../style/flat';
import PointerInteraction from './Pointer';

export type TDrawBaseEventTypes = 'change' | 'error';
export type TDrawObjectEventTypes = 'change:active' | 'propertychange';
export type TDrawDrawEventTypes = 'drawabort' | 'drawend' | 'drawstart';
/**
 * Function that takes an array of coordinates and an optional existing geometry
 * and a projection as arguments, and returns a geometry. The optional existing
 * geometry is the geometry that is returned when the function is called without
 * a second argument.
 */
export type GeometryFunction = (p0: SketchCoordType, p1: SimpleGeometry, p2: Projection) => SimpleGeometry;
/**
 * Coordinate type when drawing lines.
 */
export type LineCoordType = Coordinate[];
/**
 * Draw mode.  This collapses multi-part geometry types with their single-part
 * cousins.
 */
export type Mode = 'Point' | 'LineString' | 'Polygon' | 'Circle';
export interface Options {
    type: Type;
    clickTolerance?: number | undefined;
    features?: Collection<Feature<Geometry>> | undefined;
    source?: VectorSource<Geometry> | undefined;
    dragVertexDelay?: number | undefined;
    snapTolerance?: number | undefined;
    stopClick?: boolean | undefined;
    maxPoints?: number | undefined;
    minPoints?: number | undefined;
    finishCondition?: Condition | undefined;
    style?: StyleLike | FlatStyleLike | undefined;
    geometryFunction?: GeometryFunction | undefined;
    geometryName?: string | undefined;
    condition?: Condition | undefined;
    freehand?: boolean | undefined;
    freehandCondition?: Condition | undefined;
    trace?: boolean | Condition | undefined;
    traceSource?: VectorSource<Geometry> | undefined;
    wrapX?: boolean | undefined;
    geometryLayout?: GeometryLayout | undefined;
}
/**
 * Coordinate type when drawing points.
 */
export type PointCoordType = Coordinate;
export interface PointSegmentRelationship {
    along: number;
    squaredDistance: number;
}
/**
 * Coordinate type when drawing polygons.
 */
export type PolyCoordType = Coordinate[][];
/**
 * Types used for drawing coordinates.
 */
export type SketchCoordType = PointCoordType | LineCoordType | PolyCoordType;
export interface TraceState {
    active: boolean;
    startPx?: Pixel | undefined;
    targets?: TraceTarget[] | undefined;
    targetIndex?: number | undefined;
}
export interface TraceTarget {
    coordinates: Coordinate[];
    ring: boolean;
    startIndex: number;
    endIndex: number;
}
export interface TraceTargetUpdateInfo {
    index: number;
    endIndex: number;
}
declare enum DrawEventType {
    DRAWSTART = 'drawstart',
    DRAWEND = 'drawend',
    DRAWABORT = 'drawabort',
}
export default class Draw extends PointerInteraction {
    constructor(options: Options);
    /**
     * Stop drawing without adding the sketch feature to the target layer.
     */
    abortDrawing(): void;
    /**
     * Append coordinates to the end of the geometry that is currently being drawn.
     * This can be used when drawing LineStrings or Polygons. Coordinates will
     * either be appended to the current LineString or the outer ring of the current
     * Polygon. If no geometry is being drawn, a new one will be created.
     */
    appendCoordinates(coordinates: LineCoordType): void;
    /**
     * Initiate draw mode by starting from an existing geometry which will
     * receive new additional points. This only works on features with
     * LineString geometries, where the interaction will extend lines by adding
     * points to the end of the coordinates array.
     * This will change the original feature, instead of drawing a copy.
     * The function will dispatch a drawstart event.
     */
    extend(feature: Feature<LineString>): void;
    /**
     * Stop drawing and add the sketch feature to the target layer.
     * The {@link module:ol/interaction/Draw~DrawEventType.DRAWEND} event is
     * dispatched before inserting the feature.
     */
    finishDrawing(): void;
    /**
     * Get the overlay layer that this interaction renders sketch features to.
     */
    getOverlay(): VectorLayer<VectorSource<Geometry>>;
    /**
     * Handle pointer down events.
     */
    handleDownEvent(event: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may actually draw or finish the drawing.
     */
    handleEvent(event: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Handle pointer up events.
     */
    handleUpEvent(event: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Remove last point of the feature currently being drawn. Does not do anything when
     * drawing POINT or MULTI_POINT geometries.
     */
    removeLastPoint(): void;
    removeLastPoints_(n: number): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: Map): void;
    /**
     * Toggle tracing mode or set a tracing condition.
     */
    setTrace(trace: boolean | Condition): void;
    on(type: TDrawBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TDrawBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TDrawBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TDrawBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TDrawBaseEventTypes | TDrawBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TDrawObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TDrawObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TDrawObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TDrawObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TDrawObjectEventTypes | TDrawObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TDrawDrawEventTypes, listener: ListenerFunction<DrawEvent>): EventsKey;
    on(type: TDrawDrawEventTypes[], listener: ListenerFunction<DrawEvent>): EventsKey[];
    once(type: TDrawDrawEventTypes, listener: ListenerFunction<DrawEvent>): EventsKey;
    once(type: TDrawDrawEventTypes[], listener: ListenerFunction<DrawEvent>): EventsKey[];
    un(type: TDrawDrawEventTypes | TDrawDrawEventTypes[], listener: ListenerFunction<DrawEvent>): void;
}
export class DrawEvent extends BaseEvent {
    constructor(type: DrawEventType, feature: Feature<Geometry>);
    /**
     * The feature being drawn.
     */
    feature: Feature<Geometry>;
}
/**
 * Create a geometryFunction that will create a box-shaped polygon (aligned
 * with the coordinate system axes).  Use this with the draw interaction and
 * type: 'Circle' to return a box instead of a circle geometry.
 */
export function createBox(): GeometryFunction;
/**
 * Create a geometryFunction for type: 'Circle' that will create a regular
 * polygon with a user specified number of sides and start angle instead of a
 * {@link module:ol/geom/Circle~Circle} geometry.
 */
export function createRegularPolygon(sides?: number, angle?: number): GeometryFunction;
