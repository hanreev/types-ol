import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, Type, WriteOptions } from './Feature';

export default abstract class TextFeature extends FeatureFormat {
    constructor();
    protected abstract readFeatureFromText(text: string, opt_options?: ReadOptions): Feature<Geometry>;
    protected abstract readFeaturesFromText(text: string, opt_options?: ReadOptions): Feature<Geometry>[];
    protected abstract readGeometryFromText(text: string, opt_options?: ReadOptions): Geometry;
    protected readProjectionFromText(text: string): Projection | undefined;
    protected abstract writeFeaturesText(features: Feature<Geometry>[], opt_options?: WriteOptions): string;
    protected abstract writeFeatureText(feature: Feature<Geometry>, opt_options?: WriteOptions): string;
    protected abstract writeGeometryText(geometry: Geometry, opt_options?: WriteOptions): string;
    getType(): Type;
    /**
     * Read the feature from the source.
     */
    readFeature(source: Document | Element | object | string, opt_options?: ReadOptions): Feature<Geometry>;
    /**
     * Read the features from the source.
     */
    readFeatures(source: Document | Element | object | string, opt_options?: ReadOptions): Feature<Geometry>[];
    /**
     * Read the geometry from the source.
     */
    readGeometry(source: Document | Element | object | string, opt_options?: ReadOptions): Geometry;
    /**
     * Read the projection from the source.
     */
    readProjection(source: Document | Element | object | string): Projection | undefined;
    /**
     * Encode a feature as a string.
     */
    writeFeature(feature: Feature<Geometry>, opt_options?: WriteOptions): string;
    /**
     * Encode an array of features as string.
     */
    writeFeatures(features: Feature<Geometry>[], opt_options?: WriteOptions): string;
    /**
     * Write a single geometry.
     */
    writeGeometry(geometry: Geometry, opt_options?: WriteOptions): string;
}
