declare module 'ol/format/TopoJSON' {

  import { Coordinate } from 'ol/coordinate';
  import { ProjectionLike } from 'ol/proj';
  import { ReadOptions } from 'ol/format/Feature';
  import Feature from 'ol/Feature';
  import LineString from 'ol/geom/LineString';
  import MultiLineString from 'ol/geom/MultiLineString';
  import MultiPoint from 'ol/geom/MultiPoint';
  import MultiPolygon from 'ol/geom/MultiPolygon';
  import Point from 'ol/geom/Point';
  import Polygon from 'ol/geom/Polygon';
  import JSONFeature from 'ol/format/JSONFeature';
  import { GeometryObject } from 'topojson-specification';
  import { GeometryCollection } from 'topojson-specification';
  import { LineString as LineString_1 } from 'topojson-specification';
  import { MultiLineString as MultiLineString_1 } from 'topojson-specification';
  import { MultiPoint as MultiPoint_1 } from 'topojson-specification';
  import { MultiPolygon as MultiPolygon_1 } from 'topojson-specification';
  import { Point as Point_1 } from 'topojson-specification';
  import { Polygon as Polygon_1 } from 'topojson-specification';
  import { Topology } from 'topojson-specification';

  export interface Options {
    dataProjection?: ProjectionLike;
    layerName?: string;
    layers?: string[];
  }

  export default class TopoJSON extends JSONFeature {
    constructor(opt_options?: Options);
  }

  export type TopoJSONGeometry = GeometryObject;

  export type TopoJSONGeometryCollection = GeometryCollection;

  export type TopoJSONLineString = LineString_1;

  export type TopoJSONMultiLineString = MultiLineString_1;

  export type TopoJSONMultiPoint = MultiPoint_1;

  export type TopoJSONMultiPolygon = MultiPolygon_1;

  export type TopoJSONPoint = Point_1;

  export type TopoJSONPolygon = Polygon_1;

  export type TopoJSONTopology = Topology;

}
