import Feature, { FeatureLike } from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { WriteOptions, ReadOptions } from './Feature';

export default class TextFeature extends FeatureFormat {
    constructor();
    protected readProjectionFromText(text: string): Projection;
    protected writeGeometryText(geometry: Geometry, opt_options?: WriteOptions): string;
    protected writeFeatureText(feature: Feature, opt_options?: WriteOptions): string;
    protected readFeaturesFromText(text: string, opt_options?: ReadOptions): Feature[];
    protected writeFeaturesText(features: Feature[], opt_options?: WriteOptions): string;
    protected readGeometryFromText(text: string, opt_options?: ReadOptions): Geometry;
    protected readFeatureFromText(text: string, opt_options?: ReadOptions): Feature;
    readProjection(source: Document | Node | object | string): Projection;
    writeFeature(feature: Feature, opt_options?: WriteOptions): string;
    writeFeatures(features: Feature[], opt_options?: WriteOptions): string;
    readGeometry(source: Document | Node | object | string, opt_options?: ReadOptions): Geometry;
    readFeatures(source: Document | Node | object | string, opt_options?: ReadOptions): Feature[];
    readFeatures(source: Document | Node | ArrayBuffer | object | string, opt_options?: ReadOptions): FeatureLike[];
    writeGeometry(geometry: Geometry, opt_options?: WriteOptions): string;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): Feature;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): FeatureLike;
}
