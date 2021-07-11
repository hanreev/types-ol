import Disposable from 'ol/Disposable';
import { FeatureLike } from 'ol/Feature';
import PluggableMap from 'ol/PluggableMap';
import { FrameState } from 'ol/PluggableMap';
import { Coordinate } from 'ol/coordinate';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import Layer from 'ol/layer/Layer';
import { Pixel } from 'ol/pixel';
import EventType from 'ol/render/EventType';
import { FeatureCallback } from 'ol/renderer/vector';
import Source from 'ol/source/Source';

export interface HitMatch<T> {
    feature: FeatureLike;
    layer: Layer<Source>;
    geometry: SimpleGeometry;
    distanceSq: number;
    callback: FeatureCallback<T>;
}
export default abstract class MapRenderer extends Disposable {
    constructor(map: PluggableMap);
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
        layerFilter: (this: U, p0: Layer<Source>) => boolean,
        thisArg2: U,
    ): T | undefined;
    abstract forEachLayerAtPixel<T>(
        pixel: Pixel,
        frameState: FrameState,
        hitTolerance: number,
        callback: (p0: Layer<Source>, p1: Uint8ClampedArray | Uint8Array) => T,
        layerFilter: (p0: Layer<Source>) => boolean,
    ): T | undefined;
    getMap(): PluggableMap;
    hasFeatureAtCoordinate<U>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        checkWrapped: boolean,
        layerFilter: (this: U, p0: Layer<Source>) => boolean,
        thisArg: U,
    ): boolean;
    /**
     * Render.
     */
    abstract renderFrame(frameState: FrameState): void;
}
