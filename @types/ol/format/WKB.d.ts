import Feature from '../Feature';
import Geometry, { GeometryLayout } from '../geom/Geometry';
import Projection from '../proj/Projection';
import FeatureFormat, { ReadOptions, Type, WriteOptions } from './Feature';

export interface Options {
    splitCollection?: boolean | undefined;
    hex?: boolean | undefined;
    littleEndian?: boolean | undefined;
    ewkb?: boolean | undefined;
    geometryLayout?: GeometryLayout | undefined;
    nodataZ?: number | undefined;
    nodataM?: number | undefined;
    srid?: number | boolean | undefined;
}
export default class WKB extends FeatureFormat {
    constructor(options?: Options);
    getType(): Type;
    /**
     * Read a single feature from a source.
     */
    readFeature(source: string | ArrayBuffer | ArrayBufferView, options?: ReadOptions): Feature<Geometry>;
    /**
     * Read all features from a source.
     */
    readFeatures(source: string | ArrayBuffer | ArrayBufferView, options?: ReadOptions): Feature<Geometry>[];
    /**
     * Read a single geometry from a source.
     */
    readGeometry(source: string | ArrayBuffer | ArrayBufferView, options?: ReadOptions): Geometry;
    /**
     * Read the projection from a source.
     */
    readProjection(source: string | ArrayBuffer | ArrayBufferView): Projection | undefined;
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
