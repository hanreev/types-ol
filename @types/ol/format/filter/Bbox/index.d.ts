declare module 'ol/format/filter/Bbox' {

  import Filter from 'ol/format/filter/Filter';
  import { Extent } from 'ol/extent';

  export default class Bbox extends Filter {
    constructor(geometryName: string, extent: Extent, opt_srsName?: string);
  }

}
