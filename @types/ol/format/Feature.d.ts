import { Extent } from '../extent';
import Feature, { FeatureLike } from '../Feature';
import Geometry from '../geom/Geometry';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import FormatType from './FormatType';

export function transformWithOptions(geometry: Geometry | Extent, write: boolean, opt_options?: WriteOptions | ReadOptions): Geometry | Extent;
export default class FeatureFormat {
    constructor();
    protected defaultFeatureProjection: Projection;
    protected dataProjection: Projection;
    protected adaptOptions(options: WriteOptions | ReadOptions): WriteOptions | ReadOptions;
    protected getReadOptions(source: Document | Node | object | string, opt_options?: ReadOptions): ReadOptions;
    writeGeometry(geometry: Geometry, opt_options?: WriteOptions): string;
    getType(): FormatType;
    getLastExtent(): Extent;
    readFeatures(source: Document | Node | ArrayBuffer | object | string, opt_options?: ReadOptions): FeatureLike[];
    readGeometry(source: Document | Node | object | string, opt_options?: ReadOptions): Geometry;
    readProjection(source: Document | Node | object | string): Projection;
    writeFeature(feature: Feature, opt_options?: WriteOptions): string;
    writeFeatures(features: Feature[], opt_options?: WriteOptions): string;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): FeatureLike;
}
export interface ReadOptions {
    dataProjection?: ProjectionLike;
    extent?: Extent;
    featureProjection?: ProjectionLike;
}
export interface WriteOptions {
    dataProjection?: ProjectionLike;
    featureProjection?: ProjectionLike;
    rightHanded?: boolean;
    decimals?: number;
}
