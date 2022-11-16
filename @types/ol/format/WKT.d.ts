import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import { ReadOptions, WriteOptions } from './Feature';
import TextFeature from './TextFeature';

export interface Options {
    splitCollection?: boolean | undefined;
}
export interface Token {
    type: number;
    value?: number | string | undefined;
    position: number;
}
export default class WKT extends TextFeature {
    constructor(options?: Options);
    protected readFeatureFromText(text: string, options?: ReadOptions): Feature<Geometry>;
    protected readFeaturesFromText(text: string, options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromText(text: string, options?: ReadOptions): Geometry;
    protected writeFeaturesText(features: Feature<Geometry>[], options?: WriteOptions): string;
    protected writeFeatureText(feature: Feature<Geometry>, options?: WriteOptions): string;
    protected writeGeometryText(geometry: Geometry, options?: WriteOptions): string;
}
