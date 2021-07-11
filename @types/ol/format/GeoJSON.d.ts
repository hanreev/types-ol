import { Feature } from 'geojson';
import { FeatureCollection } from 'geojson';
import { Geometry } from 'geojson';
import { GeometryCollection } from 'geojson';
import { LineString } from 'geojson';
import { MultiLineString } from 'geojson';
import { MultiPoint } from 'geojson';
import { MultiPolygon } from 'geojson';
import { GeoJSON as GeoJSON_1 } from 'geojson';
import { Point } from 'geojson';
import { Polygon } from 'geojson';
import Feature_1 from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import { WriteOptions } from 'ol/format/Feature';
import JSONFeature from 'ol/format/JSONFeature';
import Geometry_1 from 'ol/geom/Geometry';
import { ProjectionLike } from 'ol/proj';
import Projection from 'ol/proj/Projection';

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
    dataProjection?: ProjectionLike;
    featureProjection?: ProjectionLike;
    geometryName?: string;
    extractGeometryName?: boolean;
}
export default class GeoJSON extends JSONFeature {
    constructor(opt_options?: Options);
    protected readFeatureFromObject(object: any, opt_options?: ReadOptions): Feature_1<Geometry_1>;
    protected readFeaturesFromObject(object: any, opt_options?: ReadOptions): Feature_1<Geometry_1>[];
    protected readGeometryFromObject(object: GeoJSONGeometry, opt_options?: ReadOptions): Geometry_1;
    protected readProjectionFromObject(object: any): Projection;
    /**
     * Encode a feature as a GeoJSON Feature object.
     */
    writeFeatureObject(feature: Feature_1<Geometry_1>, opt_options?: WriteOptions): GeoJSONFeature;
    /**
     * Encode an array of features as a GeoJSON object.
     */
    writeFeaturesObject(features: Feature_1<Geometry_1>[], opt_options?: WriteOptions): GeoJSONFeatureCollection;
    /**
     * Encode a geometry as a GeoJSON object.
     */
    writeGeometryObject(geometry: Geometry_1, opt_options?: WriteOptions): GeoJSONGeometry | GeoJSONGeometryCollection;
}
