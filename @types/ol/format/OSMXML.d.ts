import Feature from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import XMLFeature from 'ol/format/XMLFeature';
import Geometry from 'ol/geom/Geometry';

export default class OSMXML extends XMLFeature {
    constructor();
    protected readFeaturesFromNode(node: Element, opt_options?: ReadOptions): Feature<Geometry>[];
}
