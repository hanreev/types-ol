import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import { ReadOptions } from './Feature';
import XMLFeature from './XMLFeature';

export interface Options {
    layers?: string[] | undefined;
}
export default class WMSGetFeatureInfo extends XMLFeature {
    constructor(options?: Options);
    protected readFeaturesFromNode(node: Element, options?: ReadOptions): Feature<Geometry>[];
    getLayers(): string[] | null;
    setLayers(layers: string[] | null): void;
}
