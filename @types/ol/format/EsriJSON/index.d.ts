declare module 'ol/format/EsriJSON' {

  import GeometryLayout from 'ol/geom/GeometryLayout';
  import JSONFeature from 'ol/format/JSONFeature';
  import { Feature } from 'arcgis-rest-api';
  import { FeatureSet } from 'arcgis-rest-api';
  import { Geometry } from 'arcgis-rest-api';
  import { HasZM } from 'arcgis-rest-api';
  import { Multipoint } from 'arcgis-rest-api';
  import { Point } from 'arcgis-rest-api';
  import { Polygon } from 'arcgis-rest-api';
  import { Polyline } from 'arcgis-rest-api';
  import { Position } from 'arcgis-rest-api';
  import { SpatialReferenceWkid } from 'arcgis-rest-api';
  import SimpleGeometry from 'ol/geom/SimpleGeometry';
  import { ReadOptions } from 'ol/format/Feature';
  import Geometry_1 from 'ol/geom/Geometry';
  import { WriteOptions } from 'ol/format/Feature';

  export default class EsriJSON extends JSONFeature {
    constructor(opt_options?: Options);
  }

  export type EsriJSONFeature = Feature;

  export type EsriJSONFeatureSet = FeatureSet;

  export type EsriJSONGeometry = Geometry;

  export type EsriJSONHasZM = HasZM;

  export type EsriJSONMultipoint = Multipoint;

  export interface EsriJSONMultiPolygon {
    rings: number[][][][];
    hasM?: boolean;
    hasZ?: boolean;
    spatialReference?: EsriJSONSpatialReferenceWkid;
  }

  export type EsriJSONPoint = Point;

  export type EsriJSONPolygon = Polygon;

  export type EsriJSONPolyline = Polyline;

  export type EsriJSONPosition = Position;

  export type EsriJSONSpatialReferenceWkid = SpatialReferenceWkid;

  export interface Options {
    geometryName?: string;
  }

}
