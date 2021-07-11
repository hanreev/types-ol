import { FeatureLike } from 'ol/Feature';
import BaseEvent from 'ol/events/Event';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import Layer from 'ol/layer/Layer';
import { TransformFunction } from 'ol/proj';
import BuilderGroup from 'ol/render/canvas/BuilderGroup';
import Source from 'ol/source/Source';
import Style from 'ol/style/Style';

export type FeatureCallback<T> = (p0: FeatureLike, p1: Layer<Source>, p2: SimpleGeometry) => T;
export function defaultOrder(feature1: FeatureLike, feature2: FeatureLike): number;
export function getSquaredTolerance(resolution: number, pixelRatio: number): number;
export function getTolerance(resolution: number, pixelRatio: number): number;
export function renderFeature(
    replayGroup: BuilderGroup,
    feature: FeatureLike,
    style: Style,
    squaredTolerance: number,
    listener: (p0: BaseEvent) => void,
    opt_transform?: TransformFunction,
    opt_declutterBuilderGroup?: BuilderGroup,
): boolean;
