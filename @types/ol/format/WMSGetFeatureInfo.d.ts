import Feature from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import XMLFeature from 'ol/format/XMLFeature';
import Geometry from 'ol/geom/Geometry';

export interface Options {
    layers?: string[];
}
export default class WMSGetFeatureInfo extends XMLFeature {
    constructor(opt_options?: Options);
    protected readFeaturesFromNode(node: Element, opt_options?: ReadOptions): Feature<Geometry>[];
    getLayers(): string[];
    setLayers(layers: string[]): void;
}
