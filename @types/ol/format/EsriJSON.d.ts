import Feature_1 from '../Feature';
import Geometry_1 from '../geom/Geometry';
import Projection from '../proj/Projection';
import { ReadOptions, WriteOptions } from './Feature';
import JSONFeature from './JSONFeature';
import {
    Feature,
    FeatureSet,
    Geometry,
    HasZM,
    Multipoint,
    Point,
    Polygon,
    Polyline,
    Position,
    SpatialReferenceWkid,
} from 'arcgis-rest-api';

export type EsriJSONFeature = Feature;
export type EsriJSONFeatureSet = FeatureSet;
export type EsriJSONGeometry = Geometry;
export type EsriJSONHasZM = HasZM;
export interface EsriJSONMultiPolygon {
    rings: number[][][][];
    hasM?: boolean | undefined;
    hasZ?: boolean | undefined;
    spatialReference?: EsriJSONSpatialReferenceWkid | undefined;
}
export type EsriJSONMultipoint = Multipoint;
export type EsriJSONPoint = Point;
export type EsriJSONPolygon = Polygon;
export type EsriJSONPolyline = Polyline;
export type EsriJSONPosition = Position;
export type EsriJSONSpatialReferenceWkid = SpatialReferenceWkid;
export interface Options {
    geometryName?: string | undefined;
}
export default class EsriJSON extends JSONFeature {
    constructor(options?: Options);
    protected readFeatureFromObject(object: any, options?: ReadOptions, idField?: string): Feature_1<Geometry_1>;
    protected readFeaturesFromObject(object: any, options?: ReadOptions): Feature_1<Geometry_1>[];
    protected readGeometryFromObject(object: EsriJSONGeometry, options?: ReadOptions): Geometry_1;
    protected readProjectionFromObject(object: any): Projection;
    /**
     * Encode a feature as a esriJSON Feature object.
     */
    writeFeatureObject(feature: Feature_1<Geometry_1>, options?: WriteOptions): any;
    /**
     * Encode an array of features as a EsriJSON object.
     */
    writeFeaturesObject(features: Feature_1<Geometry_1>[], options?: WriteOptions): EsriJSONFeatureSet;
    /**
     * Encode a geometry as a EsriJSON object.
     */
    writeGeometryObject(geometry: Geometry_1, options?: WriteOptions): EsriJSONGeometry;
}
