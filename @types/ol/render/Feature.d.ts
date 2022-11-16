import Feature from '../Feature';
import { Extent } from '../extent';
import { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from '../geom';
import Geometry, { Type } from '../geom/Geometry';
import { ProjectionLike, TransformFunction } from '../proj';
import { StyleFunction } from '../style/Style';

export default class RenderFeature {
    constructor(
        type: Type,
        flatCoordinates: number[],
        ends: number[] | number[][],
        properties: Record<string, any>,
        id: number | string | undefined,
    );
    /**
     * Get a feature property by its key.
     */
    get(key: string): any;
    getEnds(): number[] | number[][];
    /**
     * Get the extent of this feature's geometry.
     */
    getExtent(): Extent;
    getFlatInteriorPoint(): number[];
    getFlatInteriorPoints(): number[];
    getFlatMidpoint(): number[];
    getFlatMidpoints(): number[];
    /**
     * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
     * determining the geometry type in style function (see {@link #getType}).
     */
    getGeometry(): RenderFeature;
    /**
     * Get the feature identifier.  This is a stable identifier for the feature and
     * is set when reading data from a remote source.
     */
    getId(): number | string | undefined;
    getOrientedFlatCoordinates(): number[];
    /**
     * Get the feature properties.
     */
    getProperties(): Record<string, any>;
    getSimplifiedGeometry(squaredTolerance: number): RenderFeature;
    getStride(): number;
    getStyleFunction(): StyleFunction | undefined;
    /**
     * Get the type of this feature's geometry.
     */
    getType(): Type;
    /**
     * Get a transformed and simplified version of the geometry.
     */
    simplifyTransformed(squaredTolerance: number, transform?: TransformFunction): RenderFeature;
    /**
     * Transform geometry coordinates from tile pixel space to projected.
     */
    transform(projection: ProjectionLike): void;
}
/**
 * Create an ol/Feature from an ol/render/Feature
 */
export function toFeature(renderFeature: RenderFeature, geometryName?: string): Feature<Geometry>;
/**
 * Create a geometry from an ol/render/Feature
 */
export function toGeometry(
    renderFeature: RenderFeature,
): Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
