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
import Feature_1 from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import { WriteOptions } from 'ol/format/Feature';
import JSONFeature from 'ol/format/JSONFeature';
import Geometry_1 from 'ol/geom/Geometry';
import Projection from 'ol/proj/Projection';

export type EsriJSONFeature = Feature;
export type EsriJSONFeatureSet = FeatureSet;
export type EsriJSONGeometry = Geometry;
export type EsriJSONHasZM = HasZM;
export interface EsriJSONMultiPolygon {
    rings: number[][][][];
    hasM?: boolean;
    hasZ?: boolean;
    spatialReference?: EsriJSONSpatialReferenceWkid;
}
export type EsriJSONMultipoint = Multipoint;
export type EsriJSONPoint = Point;
export type EsriJSONPolygon = Polygon;
export type EsriJSONPolyline = Polyline;
export type EsriJSONPosition = Position;
export type EsriJSONSpatialReferenceWkid = SpatialReferenceWkid;
export interface Options {
    geometryName?: string;
}
export default class EsriJSON extends JSONFeature {
    constructor(opt_options?: Options);
    protected readFeatureFromObject(
        object: any,
        opt_options?: ReadOptions,
        opt_idField?: string,
    ): Feature_1<Geometry_1>;
    protected readFeaturesFromObject(object: any, opt_options?: ReadOptions): Feature_1<Geometry_1>[];
    protected readGeometryFromObject(object: EsriJSONGeometry, opt_options?: ReadOptions): Geometry_1;
    protected readProjectionFromObject(object: any): Projection;
    /**
     * Encode a feature as a esriJSON Feature object.
     */
    writeFeatureObject(feature: Feature_1<Geometry_1>, opt_options?: WriteOptions): any;
    /**
     * Encode an array of features as a EsriJSON object.
     */
    writeFeaturesObject(features: Feature_1<Geometry_1>[], opt_options?: WriteOptions): EsriJSONFeatureSet;
    /**
     * Encode a geometry as a EsriJSON object.
     */
    writeGeometryObject(geometry: Geometry_1, opt_options?: WriteOptions): EsriJSONGeometry;
}
