import Feature, { FeatureClass, FeatureLike } from '../Feature';
import Geometry from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, Type, WriteOptions } from './Feature';

export interface Options {
    featureClass?: FeatureClass | undefined;
    geometryName?: string | undefined;
    layerName?: string | undefined;
    layers?: string[] | undefined;
    idProperty?: string | undefined;
}
export default class MVT extends FeatureFormat {
    constructor(options?: Options);
    getType(): Type;
    /**
     * Read a single feature from a source.
     */
    readFeature(source: Document | Element | object | string, options?: ReadOptions): FeatureLike;
    /**
     * Read all features.
     */
    readFeatures(source: ArrayBuffer, options?: ReadOptions): FeatureLike[];
    /**
     * Read a single geometry from a source.
     */
    readGeometry(source: Document | Element | object | string, options?: ReadOptions): Geometry;
    /**
     * Read the projection from the source.
     */
    readProjection(source: Document | Element | object | string): Projection;
    /**
     * Sets the layers that features will be read from.
     */
    setLayers(layers: string[]): void;
    /**
     * Encode a feature in this format.
     */
    writeFeature(feature: Feature<Geometry>, options?: WriteOptions): string | ArrayBuffer;
    /**
     * Encode an array of features in this format.
     */
    writeFeatures(features: Feature<Geometry>[], options?: WriteOptions): string | ArrayBuffer;
    /**
     * Write a single geometry in this format.
     */
    writeGeometry(geometry: Geometry, options?: WriteOptions): string | ArrayBuffer;
}
