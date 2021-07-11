import Feature from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import { WriteOptions } from 'ol/format/Feature';
import XMLFeature from 'ol/format/XMLFeature';
import Geometry from 'ol/geom/Geometry';

export interface LayoutOptions {
    hasZ?: boolean;
    hasM?: boolean;
}
export interface Options {
    readExtensions?: (p0: Feature<Geometry>, p1: Node) => void;
}
export default class GPX extends XMLFeature {
    constructor(opt_options?: Options);
    readFeatureFromNode(node: Element, opt_options?: ReadOptions): Feature<Geometry>;
    readFeaturesFromNode(node: Element, opt_options?: ReadOptions): Feature<Geometry>[];
    /**
     * Encode an array of features in the GPX format as an XML node.
     * LineString geometries are output as routes (<rte>), and MultiLineString
     * as tracks (<trk>).
     */
    writeFeaturesNode(features: Feature<Geometry>[], opt_options?: WriteOptions): Node;
}
