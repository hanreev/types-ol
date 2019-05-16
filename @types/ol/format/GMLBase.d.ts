import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import LinearRing from '../geom/LinearRing';
import LineString from '../geom/LineString';
import MultiLineString from '../geom/MultiLineString';
import MultiPoint from '../geom/MultiPoint';
import MultiPolygon from '../geom/MultiPolygon';
import Point from '../geom/Point';
import Polygon from '../geom/Polygon';
import { Parser } from '../xml';
import XMLFeature from './XMLFeature';

export default class GMLBase extends XMLFeature {
    constructor(opt_options?: Options);
    protected featureNS: { [key: string]: string } | string;
    protected srsName: string;
    protected schemaLocation: string;
    protected featureType: string[] | string;
    protected GEOMETRY_PARSERS: { [key: string]: { [key: string]: Parser } };
    protected GEOMETRY_FLAT_COORDINATES_PARSERS: { [key: string]: { [key: string]: Parser } };
    protected RING_PARSERS: { [key: string]: { [key: string]: Parser } };
    protected FLAT_LINEAR_RINGS_PARSERS: { [key: string]: { [key: string]: Parser } };
    readGeometryElement(node: Element, objectStack: any[]): Geometry;
    readLinearRing(node: Element, objectStack: any[]): LinearRing;
    readLineString(node: Element, objectStack: any[]): LineString;
    readFeatureElement(node: Element, objectStack: any[]): Feature;
    readMultiPoint(node: Element, objectStack: any[]): MultiPoint;
    readMultiPolygon(node: Element, objectStack: any[]): MultiPolygon;
    readPoint(node: Element, objectStack: any[]): Point;
    readPolygon(node: Element, objectStack: any[]): Polygon;
    readFeatureElementInternal(node: Element, objectStack: any[], asFeature: boolean): Feature | object;
    readFeaturesInternal(node: Element, objectStack: any[]): Feature[];
    readMultiLineString(node: Element, objectStack: any[]): MultiLineString;
}
export const GMLNS: string;
export interface Options {
    featureNS?: { [key: string]: string } | string;
    featureType?: string[] | string;
    srsName: string;
    surface?: boolean;
    curve?: boolean;
    multiCurve?: boolean;
    multiSurface?: boolean;
    schemaLocation?: string;
    hasZ?: boolean;
}
