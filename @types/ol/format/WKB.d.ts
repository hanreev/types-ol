import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import GeometryLayout from '../geom/GeometryLayout';
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
    constructor(opt_options?: Options);
    getType(): Type;
    /**
     * Read a single feature from a source.
     */
    readFeature(source: string | ArrayBuffer | ArrayBufferView, opt_options?: ReadOptions): Feature<Geometry>;
    /**
     * Read all features from a source.
     */
    readFeatures(source: string | ArrayBuffer | ArrayBufferView, opt_options?: ReadOptions): Feature<Geometry>[];
    /**
     * Read a single geometry from a source.
     */
    readGeometry(source: string | ArrayBuffer | ArrayBufferView, opt_options?: ReadOptions): Geometry;
    /**
     * Read the projection from a source.
     */
    readProjection(source: string | ArrayBuffer | ArrayBufferView): Projection | undefined;
    /**
     * Encode a feature in this format.
     */
    writeFeature(feature: Feature<Geometry>, opt_options?: WriteOptions): string | ArrayBuffer;
    /**
     * Encode an array of features in this format.
     */
    writeFeatures(features: Feature<Geometry>[], opt_options?: WriteOptions): string | ArrayBuffer;
    /**
     * Write a single geometry in this format.
     */
    writeGeometry(geometry: Geometry, opt_options?: WriteOptions): string | ArrayBuffer;
}
