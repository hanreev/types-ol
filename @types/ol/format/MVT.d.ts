import { FeatureClass, FeatureLike } from '../Feature';
import GeometryType from '../geom/GeometryType';
import FeatureFormat, { ReadOptions } from './Feature';

export interface Options {
    featureClass?: FeatureClass;
    geometryName?: string;
    layerName?: string;
    layers?: string[];
    idProperty?: string;
}
export default class MVT extends FeatureFormat {
    constructor(opt_options?: Options);
    readFeatures(source: ArrayBuffer, opt_options?: ReadOptions): FeatureLike[];
    readFeatures(source: Document | Node | ArrayBuffer | object | string, opt_options?: ReadOptions): FeatureLike[];
    setLayers(layers: string[]): void;
}
