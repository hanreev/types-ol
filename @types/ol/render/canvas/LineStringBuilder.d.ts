import { FeatureLike } from '../../Feature';
import { Extent } from '../../extent';
import LineString from '../../geom/LineString';
import MultiLineString from '../../geom/MultiLineString';
import RenderFeature from '../Feature';
import { FillStrokeState, SerializableInstructions } from '../canvas';
import CanvasBuilder from './Builder';

export default class CanvasLineStringBuilder extends CanvasBuilder {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    applyStroke(state: FillStrokeState): void;
    drawLineString(lineStringGeometry: LineString | RenderFeature, feature: FeatureLike): void;
    drawMultiLineString(multiLineStringGeometry: MultiLineString | RenderFeature, feature: FeatureLike): void;
    finish(): SerializableInstructions;
}
