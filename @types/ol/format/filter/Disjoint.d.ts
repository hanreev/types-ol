import Spatial from 'ol/format/filter/Spatial';
import Geometry from 'ol/geom/Geometry';

export default class Disjoint extends Spatial {
    constructor(geometryName: string, geometry: Geometry, opt_srsName?: string);
}
