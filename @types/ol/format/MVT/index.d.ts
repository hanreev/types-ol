declare module 'ol/format/MVT' {

  import GeometryType from 'ol/geom/GeometryType';
  import FeatureFormat from 'ol/format/Feature';
  import { FeatureClass } from 'ol/Feature';

  export default class MVT extends FeatureFormat {
    constructor(opt_options?: Options);
    setLayers(layers: string[]): void;
  }

  export interface Options {
    featureClass?: FeatureClass;
    geometryName?: string;
    layerName?: string;
    layers?: string[];
  }

}
