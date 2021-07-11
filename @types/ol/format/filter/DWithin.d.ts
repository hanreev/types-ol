import Spatial from 'ol/format/filter/Spatial';
import Geometry from 'ol/geom/Geometry';

export default class DWithin extends Spatial {
    constructor(geometryName: string, geometry: Geometry, distance: number, unit: string, opt_srsName?: string);
}
