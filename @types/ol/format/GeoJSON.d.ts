import Feature_1 from '../Feature';
import Geometry_1 from '../geom/Geometry';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import { ReadOptions, WriteOptions } from './Feature';
import JSONFeature from './JSONFeature';
import {
    Feature,
    FeatureCollection,
    GeoJSON as GeoJSON_1,
    Geometry,
    GeometryCollection,
    LineString,
    MultiLineString,
    MultiPoint,
    MultiPolygon,
    Point,
    Polygon,
} from 'geojson';

export type GeoJSONFeature = Feature;
export type GeoJSONFeatureCollection = FeatureCollection;
export type GeoJSONGeometry = Geometry;
export type GeoJSONGeometryCollection = GeometryCollection;
export type GeoJSONLineString = LineString;
export type GeoJSONMultiLineString = MultiLineString;
export type GeoJSONMultiPoint = MultiPoint;
export type GeoJSONMultiPolygon = MultiPolygon;
export type GeoJSONObject = GeoJSON_1;
export type GeoJSONPoint = Point;
export type GeoJSONPolygon = Polygon;
export interface Options {
    dataProjection?: ProjectionLike | undefined;
    featureProjection?: ProjectionLike | undefined;
    geometryName?: string | undefined;
    extractGeometryName?: boolean | undefined;
}
export default class GeoJSON extends JSONFeature {
    constructor(options?: Options);
    protected readFeatureFromObject(object: any, options?: ReadOptions): Feature_1<Geometry_1>;
    protected readFeaturesFromObject(object: any, options?: ReadOptions): Feature_1<Geometry_1>[];
    protected readGeometryFromObject(object: GeoJSONGeometry, options?: ReadOptions): Geometry_1;
    protected readProjectionFromObject(object: any): Projection;
    /**
     * Encode a feature as a GeoJSON Feature object.
     */
    writeFeatureObject(feature: Feature_1<Geometry_1>, options?: WriteOptions): GeoJSONFeature;
    /**
     * Encode an array of features as a GeoJSON object.
     */
    writeFeaturesObject(features: Feature_1<Geometry_1>[], options?: WriteOptions): GeoJSONFeatureCollection;
    /**
     * Encode a geometry as a GeoJSON object.
     */
    writeGeometryObject(geometry: Geometry_1, options?: WriteOptions): GeoJSONGeometry | GeoJSONGeometryCollection;
}
