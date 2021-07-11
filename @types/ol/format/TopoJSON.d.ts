import Feature from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import { WriteOptions } from 'ol/format/Feature';
import JSONFeature from 'ol/format/JSONFeature';
import Geometry from 'ol/geom/Geometry';
import { ProjectionLike } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { GeometryObject } from 'topojson-specification';
import { GeometryCollection } from 'topojson-specification';
import { LineString } from 'topojson-specification';
import { MultiLineString } from 'topojson-specification';
import { MultiPoint } from 'topojson-specification';
import { MultiPolygon } from 'topojson-specification';
import { Point } from 'topojson-specification';
import { Polygon } from 'topojson-specification';
import { Topology } from 'topojson-specification';

export interface Options {
    dataProjection?: ProjectionLike;
    layerName?: string;
    layers?: string[];
}
export type TopoJSONGeometry = GeometryObject;
export type TopoJSONGeometryCollection = GeometryCollection;
export type TopoJSONLineString = LineString;
export type TopoJSONMultiLineString = MultiLineString;
export type TopoJSONMultiPoint = MultiPoint;
export type TopoJSONMultiPolygon = MultiPolygon;
export type TopoJSONPoint = Point;
export type TopoJSONPolygon = Polygon;
export type TopoJSONTopology = Topology;
export default class TopoJSON extends JSONFeature {
    constructor(opt_options?: Options);
    protected readFeatureFromObject(object: any, opt_options?: ReadOptions): Feature<Geometry>;
    protected readFeaturesFromObject(object: any, opt_options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromObject(object: any, opt_options?: ReadOptions): Geometry;
    protected readProjectionFromObject(object: any): Projection;
    writeFeatureObject(feature: Feature<Geometry>, opt_options?: WriteOptions): any;
    writeFeaturesObject(features: Feature<Geometry>[], opt_options?: WriteOptions): any;
    writeGeometryObject(geometry: Geometry, opt_options?: WriteOptions): any;
}
