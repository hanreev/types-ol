import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import { ReadOptions, WriteOptions } from './Feature';
import XMLFeature from './XMLFeature';

export interface LayoutOptions {
    hasZ?: boolean | undefined;
    hasM?: boolean | undefined;
}
export interface Options {
    readExtensions?: ((p0: Feature<Geometry>, p1: Node) => void) | undefined;
}
export default class GPX extends XMLFeature {
    constructor(options?: Options);
    readFeatureFromNode(node: Element, options?: ReadOptions): Feature<Geometry>;
    readFeaturesFromNode(node: Element, options?: ReadOptions): Feature<Geometry>[];
    /**
     * Encode an array of features in the GPX format as an XML node.
     * LineString geometries are output as routes (<rte>), and MultiLineString
     * as tracks (<trk>).
     */
    writeFeaturesNode(features: Feature<Geometry>[], options?: WriteOptions): Node;
}
