import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, Type, WriteOptions } from './Feature';

export default abstract class JSONFeature extends FeatureFormat {
    constructor();
    protected abstract readFeatureFromObject(object: any, options?: ReadOptions): Feature<Geometry>;
    protected abstract readFeaturesFromObject(object: any, options?: ReadOptions): Feature<Geometry>[];
    protected abstract readGeometryFromObject(object: any, options?: ReadOptions): Geometry;
    protected abstract readProjectionFromObject(object: any): Projection;
    getType(): Type;
    /**
     * Read a feature.  Only works for a single feature. Use readFeatures to
     * read a feature collection.
     */
    readFeature(source: ArrayBuffer | Document | Element | object | string, options?: ReadOptions): Feature<Geometry>;
    /**
     * Read all features.  Works with both a single feature and a feature
     * collection.
     */
    readFeatures(
        source: ArrayBuffer | Document | Element | object | string,
        options?: ReadOptions,
    ): Feature<Geometry>[];
    /**
     * Read a geometry.
     */
    readGeometry(source: ArrayBuffer | Document | Element | object | string, options?: ReadOptions): Geometry;
    /**
     * Read the projection.
     */
    readProjection(source: ArrayBuffer | Document | Element | object | string): Projection;
    /**
     * Encode a feature as string.
     */
    writeFeature(feature: Feature<Geometry>, options?: WriteOptions): string;
    abstract writeFeatureObject(feature: Feature<Geometry>, options?: WriteOptions): any;
    /**
     * Encode an array of features as string.
     */
    writeFeatures(features: Feature<Geometry>[], options?: WriteOptions): string;
    abstract writeFeaturesObject(features: Feature<Geometry>[], options?: WriteOptions): any;
    /**
     * Encode a geometry as string.
     */
    writeGeometry(geometry: Geometry, options?: WriteOptions): string;
    abstract writeGeometryObject(geometry: Geometry, options?: WriteOptions): any;
}
