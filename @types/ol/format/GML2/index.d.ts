declare module 'ol/format/GML2' {

  import GMLBase from 'ol/format/GMLBase';
  import { Options } from 'ol/format/GMLBase';
  import { Parser } from 'ol/xml';
  import Feature from 'ol/Feature';
  import Geometry from 'ol/geom/Geometry';
  import { Extent } from 'ol/extent';

  export default class GML2 extends GMLBase {
    constructor(opt_options?: Options);
    protected FLAT_LINEAR_RINGS_PARSERS: { [key: string]: { [key: string]: Parser } };
    protected GEOMETRY_FLAT_COORDINATES_PARSERS: { [key: string]: { [key: string]: Parser } };
    protected GEOMETRY_PARSERS: { [key: string]: { [key: string]: Parser } };
    writeFeatureElement(node: Element, feature: Feature, objectStack: any[]): void;
    writeGeometryElement(node: Node, geometry: Geometry | Extent, objectStack: any[]): void;
  }

}
