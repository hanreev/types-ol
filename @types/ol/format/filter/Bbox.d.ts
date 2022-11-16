import { Extent } from '../../extent';
import Filter from './Filter';

export default class Bbox extends Filter {
    constructor(geometryName: string, extent: Extent, srsName?: string);
}
