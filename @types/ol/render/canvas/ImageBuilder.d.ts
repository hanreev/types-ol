import { FeatureLike } from 'ol/Feature';
import { Extent } from 'ol/extent';
import MultiPoint from 'ol/geom/MultiPoint';
import Point from 'ol/geom/Point';
import RenderFeature from 'ol/render/Feature';
import { SerializableInstructions } from 'ol/render/canvas';
import CanvasBuilder from 'ol/render/canvas/Builder';
import ImageStyle from 'ol/style/Image';

export default class CanvasImageBuilder extends CanvasBuilder {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    drawMultiPoint(multiPointGeometry: MultiPoint | RenderFeature, feature: FeatureLike): void;
    drawPoint(pointGeometry: Point | RenderFeature, feature: FeatureLike): void;
    finish(): SerializableInstructions;
    setImageStyle(imageStyle: ImageStyle, opt_sharedData?: any): void;
}
