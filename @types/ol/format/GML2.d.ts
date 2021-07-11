import Feature from 'ol/Feature';
import { Extent } from 'ol/extent';
import GMLBase from 'ol/format/GMLBase';
import { Options } from 'ol/format/GMLBase';
import Geometry from 'ol/geom/Geometry';
import LineString from 'ol/geom/LineString';
import LinearRing from 'ol/geom/LinearRing';
import MultiLineString from 'ol/geom/MultiLineString';
import MultiPoint from 'ol/geom/MultiPoint';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Point from 'ol/geom/Point';
import Polygon from 'ol/geom/Polygon';

export default class GML2 extends GMLBase {
    constructor(opt_options?: Options);
    innerBoundaryIsParser(node: Element, objectStack: any[]): void;
    outerBoundaryIsParser(node: Element, objectStack: any[]): void;
    readBox(node: Element, objectStack: any[]): Extent | undefined;
    readFlatCoordinates(node: Node, objectStack: any[]): number[] | undefined;
    writeCurveOrLineString(node: Element, geometry: LineString, objectStack: any[]): void;
    writeEnvelope(node: Element, extent: Extent, objectStack: any[]): void;
    writeFeatureElement(node: Element, feature: Feature<Geometry>, objectStack: any[]): void;
    writeGeometryElement(node: Node, geometry: Geometry | Extent, objectStack: any[]): void;
    writeLinearRing(node: Element, geometry: LinearRing, objectStack: any[]): void;
    writeLineStringOrCurveMember(node: Element, line: LineString, objectStack: any[]): void;
    writeMultiCurveOrLineString(node: Element, geometry: MultiLineString, objectStack: any[]): void;
    writeMultiPoint(node: Element, geometry: MultiPoint, objectStack: any[]): void;
    writeMultiSurfaceOrPolygon(node: Element, geometry: MultiPolygon, objectStack: any[]): void;
    writePoint(node: Element, geometry: Point, objectStack: any[]): void;
    writePointMember(node: Node, point: Point, objectStack: any[]): void;
    writeRing(node: Node, ring: LinearRing, objectStack: any[]): void;
    writeSurfaceOrPolygon(node: Element, geometry: Polygon, objectStack: any[]): void;
    writeSurfaceOrPolygonMember(node: Node, polygon: Polygon, objectStack: any[]): void;
}
