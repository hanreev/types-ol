import { FeatureLike } from 'ol/Feature';
import { Extent } from 'ol/extent';
import LineString from 'ol/geom/LineString';
import MultiLineString from 'ol/geom/MultiLineString';
import RenderFeature from 'ol/render/Feature';
import { FillStrokeState } from 'ol/render/canvas';
import { SerializableInstructions } from 'ol/render/canvas';
import CanvasBuilder from 'ol/render/canvas/Builder';

export default class CanvasLineStringBuilder extends CanvasBuilder {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    applyStroke(state: FillStrokeState): void;
    drawLineString(lineStringGeometry: LineString | RenderFeature, feature: FeatureLike): void;
    drawMultiLineString(multiLineStringGeometry: MultiLineString | RenderFeature, feature: FeatureLike): void;
    finish(): SerializableInstructions;
}
