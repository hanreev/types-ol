import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import { ReadOptions, WriteOptions } from './Feature';
import TextFeature from './TextFeature';

/**
 * IGC altitude/z. One of 'barometric', 'gps', 'none'.
 */
export type IGCZ = 'barometric' | 'gps' | 'none';
export interface Options {
    altitudeMode?: IGCZ | undefined;
}
export default class IGC extends TextFeature {
    constructor(options?: Options);
    protected readFeatureFromText(text: string, options?: ReadOptions): Feature<Geometry>;
    protected readFeaturesFromText(text: string, options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromText(text: string, options?: ReadOptions): Geometry;
    protected writeFeaturesText(features: Feature<Geometry>[], options?: WriteOptions): string;
    protected writeFeatureText(feature: Feature<Geometry>, options?: WriteOptions): string;
    protected writeGeometryText(geometry: Geometry, options?: WriteOptions): string;
}
