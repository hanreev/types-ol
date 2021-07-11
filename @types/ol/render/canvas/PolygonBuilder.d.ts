import Feature from 'ol/Feature';
import { FeatureLike } from 'ol/Feature';
import { Extent } from 'ol/extent';
import Circle from 'ol/geom/Circle';
import Geometry from 'ol/geom/Geometry';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Polygon from 'ol/geom/Polygon';
import RenderFeature from 'ol/render/Feature';
import { SerializableInstructions } from 'ol/render/canvas';
import CanvasBuilder from 'ol/render/canvas/Builder';

export default class CanvasPolygonBuilder extends CanvasBuilder {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    drawCircle(circleGeometry: Circle, feature: Feature<Geometry>): void;
    drawMultiPolygon(multiPolygonGeometry: MultiPolygon, feature: FeatureLike): void;
    drawPolygon(polygonGeometry: Polygon | RenderFeature, feature: FeatureLike): void;
    finish(): SerializableInstructions;
}
