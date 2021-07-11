import { FeatureLike } from 'ol/Feature';
import { Extent } from 'ol/extent';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import RenderFeature from 'ol/render/Feature';
import { SerializableInstructions } from 'ol/render/canvas';
import CanvasBuilder from 'ol/render/canvas/Builder';
import Text from 'ol/style/Text';

export enum TEXT_ALIGN {
    left = 0,
    end = 0,
    center = 0.5,
    right = 1,
    start = 1,
    top = 0,
    middle = 0.5,
    hanging = 0.2,
    alphabetic = 0.8,
    ideographic = 0.8,
    bottom = 1,
}
export default class CanvasTextBuilder extends CanvasBuilder {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    drawText(geometry: SimpleGeometry | RenderFeature, feature: FeatureLike): void;
    finish(): SerializableInstructions;
    setTextStyle(textStyle: Text, opt_sharedData?: any): void;
}
