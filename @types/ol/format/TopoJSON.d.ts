import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import { ReadOptions, WriteOptions } from './Feature';
import JSONFeature from './JSONFeature';
import {
    GeometryCollection,
    GeometryObject,
    LineString,
    MultiLineString,
    MultiPoint,
    MultiPolygon,
    Point,
    Polygon,
    Topology,
} from 'topojson-specification';

export interface Options {
    dataProjection?: ProjectionLike | undefined;
    layerName?: string | undefined;
    layers?: string[] | undefined;
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
    constructor(options?: Options);
    protected readFeatureFromObject(object: any, options?: ReadOptions): Feature<Geometry>;
    protected readFeaturesFromObject(object: any, options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromObject(object: any, options?: ReadOptions): Geometry;
    protected readProjectionFromObject(object: any): Projection;
    writeFeatureObject(feature: Feature<Geometry>, options?: WriteOptions): any;
    writeFeaturesObject(features: Feature<Geometry>[], options?: WriteOptions): any;
    writeGeometryObject(geometry: Geometry, options?: WriteOptions): any;
}
