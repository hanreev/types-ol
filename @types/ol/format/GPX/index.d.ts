declare module 'ol/format/GPX' {

  import GeometryLayout from 'ol/geom/GeometryLayout';
  import XMLFeature from 'ol/format/XMLFeature';
  import Feature from 'ol/Feature';
  import LineString from 'ol/geom/LineString';
  import { Coordinate } from 'ol/coordinate';

  export default class GPX extends XMLFeature {
    constructor(opt_options?: Options);
  }

  export interface LayoutOptions {
    hasZ?: boolean;
    hasM?: boolean;
  }

  export interface Options {
    readExtensions?: ((param0: Feature, param1: Node) => void);
  }

}
