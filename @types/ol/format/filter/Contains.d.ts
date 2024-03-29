import Geometry from '../../geom/Geometry';
import Spatial from './Spatial';

export default class Contains extends Spatial {
    constructor(geometryName: string, geometry: Geometry, srsName?: string);
}
