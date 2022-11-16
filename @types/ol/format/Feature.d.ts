import Feature, { FeatureLike } from '../Feature';
import { Extent } from '../extent';
import Geometry from '../geom/Geometry';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';

export interface ReadOptions {
    dataProjection?: ProjectionLike | undefined;
    extent?: Extent | undefined;
    featureProjection?: ProjectionLike | undefined;
}
export type Type = 'arraybuffer' | 'json' | 'text' | 'xml';
export interface WriteOptions {
    dataProjection?: ProjectionLike | undefined;
    featureProjection?: ProjectionLike | undefined;
    rightHanded?: boolean | undefined;
    decimals?: number | undefined;
}
export default abstract class FeatureFormat {
    constructor();
    protected dataProjection: Projection;
    protected defaultFeatureProjection: Projection;
    /**
     * Sets the dataProjection on the options, if no dataProjection
     * is set.
     */
    protected adaptOptions(options: WriteOptions | ReadOptions | undefined): WriteOptions | ReadOptions | undefined;
    /**
     * Adds the data projection to the read options.
     */
    protected getReadOptions(
        source: Document | Element | object | string,
        options?: ReadOptions,
    ): ReadOptions | undefined;
    abstract getType(): Type;
    /**
     * Read a single feature from a source.
     */
    abstract readFeature(source: Document | Element | object | string, options?: ReadOptions): FeatureLike;
    /**
     * Read all features from a source.
     */
    abstract readFeatures(
        source: Document | Element | ArrayBuffer | object | string,
        options?: ReadOptions,
    ): FeatureLike[];
    /**
     * Read a single geometry from a source.
     */
    abstract readGeometry(source: Document | Element | object | string, options?: ReadOptions): Geometry;
    /**
     * Read the projection from a source.
     */
    abstract readProjection(source: Document | Element | object | string): Projection | undefined;
    /**
     * Encode a feature in this format.
     */
    abstract writeFeature(feature: Feature<Geometry>, options?: WriteOptions): string | ArrayBuffer;
    /**
     * Encode an array of features in this format.
     */
    abstract writeFeatures(features: Feature<Geometry>[], options?: WriteOptions): string | ArrayBuffer;
    /**
     * Write a single geometry in this format.
     */
    abstract writeGeometry(geometry: Geometry, options?: WriteOptions): string | ArrayBuffer;
}
export function transformExtentWithOptions(extent: Extent, options?: ReadOptions): Extent;
export function transformGeometryWithOptions(
    geometry: Geometry,
    write: boolean,
    options?: WriteOptions | ReadOptions,
): Geometry;
