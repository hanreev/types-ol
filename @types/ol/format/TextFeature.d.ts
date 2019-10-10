import Feature, { FeatureLike } from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, WriteOptions } from './Feature';

export default class TextFeature extends FeatureFormat {
    constructor();
    protected readFeatureFromText(text: string, opt_options?: ReadOptions): Feature<GeomType>;
    protected readFeaturesFromText(text: string, opt_options?: ReadOptions): Feature<GeomType>[];
    protected readGeometryFromText(text: string, opt_options?: ReadOptions): Geometry;
    protected readProjectionFromText(text: string): Projection;
    protected writeFeaturesText(features: Feature<GeomType>[], opt_options?: WriteOptions): string;
    protected writeFeatureText(feature: Feature<GeomType>, opt_options?: WriteOptions): string;
    protected writeGeometryText(geometry: Geometry, opt_options?: WriteOptions): string;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): Feature<GeomType>;
    readFeature(source: Document | Node | object | string, opt_options?: ReadOptions): FeatureLike;
    readFeatures(source: Document | Node | object | string, opt_options?: ReadOptions): Feature<GeomType>[];
    readFeatures(source: Document | Node | ArrayBuffer | object | string, opt_options?: ReadOptions): FeatureLike[];
    readGeometry(source: Document | Node | object | string, opt_options?: ReadOptions): Geometry;
    readProjection(source: Document | Node | object | string): Projection;
    writeFeature(feature: Feature<GeomType>, opt_options?: WriteOptions): string;
    writeFeatures(features: Feature<GeomType>[], opt_options?: WriteOptions): string;
    writeGeometry(geometry: Geometry, opt_options?: WriteOptions): string;
}
