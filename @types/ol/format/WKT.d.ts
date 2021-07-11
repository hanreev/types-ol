import Feature from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import { WriteOptions } from 'ol/format/Feature';
import TextFeature from 'ol/format/TextFeature';
import Geometry from 'ol/geom/Geometry';

export interface Options {
    splitCollection?: boolean;
}
export interface Token {
    type: number;
    value?: number | string;
    position: number;
}
export default class WKT extends TextFeature {
    constructor(opt_options?: Options);
    protected readFeatureFromText(text: string, opt_options?: ReadOptions): Feature<Geometry>;
    protected readFeaturesFromText(text: string, opt_options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromText(text: string, opt_options?: ReadOptions): Geometry;
    protected writeFeaturesText(features: Feature<Geometry>[], opt_options?: WriteOptions): string;
    protected writeFeatureText(feature: Feature<Geometry>, opt_options?: WriteOptions): string;
    protected writeGeometryText(geometry: Geometry, opt_options?: WriteOptions): string;
}
