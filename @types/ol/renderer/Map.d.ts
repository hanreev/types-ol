import Disposable from '../Disposable';
import { FeatureLike } from '../Feature';
import Map, { FrameState } from '../Map';
import { Coordinate } from '../coordinate';
import SimpleGeometry from '../geom/SimpleGeometry';
import Layer from '../layer/Layer';
import EventType from '../render/EventType';
import Source from '../source/Source';
import LayerRenderer from './Layer';
import { FeatureCallback } from './vector';

export interface HitMatch<T> {
    feature: FeatureLike;
    layer: Layer<Source, LayerRenderer>;
    geometry: SimpleGeometry;
    distanceSq: number;
    callback: FeatureCallback<T>;
}
export default abstract class MapRenderer extends Disposable {
    constructor(map: Map);
    protected calculateMatrices2D(frameState: FrameState): void;
    protected scheduleExpireIconCache(frameState: FrameState): void;
    abstract dispatchRenderEvent(type: EventType, frameState: FrameState): void;
    forEachFeatureAtCoordinate<S, T, U>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        checkWrapped: boolean,
        callback: FeatureCallback<T>,
        thisArg: S,
        layerFilter: (this: U, p0: Layer<Source, LayerRenderer>) => boolean,
        thisArg2: U,
    ): T | undefined;
    getMap(): Map;
    hasFeatureAtCoordinate<U>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        checkWrapped: boolean,
        layerFilter: (this: U, p0: Layer<Source, LayerRenderer>) => boolean,
        thisArg: U,
    ): boolean;
    /**
     * Render.
     */
    abstract renderFrame(frameState: FrameState): void;
}
