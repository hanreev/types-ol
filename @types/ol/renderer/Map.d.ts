import { Coordinate } from '../coordinate';
import Disposable from '../Disposable';
import { FeatureLike } from '../Feature';
import Layer from '../layer/Layer';
import { Pixel } from '../pixel';
import PluggableMap, { FrameState } from '../PluggableMap';
import EventType from '../render/EventType';

export default class MapRenderer extends Disposable {
    constructor(map: PluggableMap);
    protected calculateMatrices2D(frameState: FrameState): void;
    protected scheduleExpireIconCache(frameState: FrameState): void;
    dispatchRenderEvent(type: EventType, frameState: FrameState): void;
    forEachFeatureAtCoordinate<S, T, U>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        checkWrapped: boolean,
        callback: (this: S, p0: FeatureLike, p1: Layer<SourceType>) => T,
        thisArg: S,
        layerFilter: (this: U, p0: Layer<SourceType>) => boolean,
        thisArg2: U,
    ): T;
    forEachLayerAtPixel<S, T, U>(
        pixel: Pixel,
        frameState: FrameState,
        hitTolerance: number,
        callback: (this: S, p0: Layer<SourceType>, p1: Uint8ClampedArray | Uint8Array) => T,
        layerFilter: (this: U, p0: Layer<SourceType>) => boolean,
    ): T;
    getMap(): PluggableMap;
    hasFeatureAtCoordinate<U>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        checkWrapped: boolean,
        layerFilter: (this: U, p0: Layer<SourceType>) => boolean,
        thisArg: U,
    ): boolean;
    renderFrame(frameState: FrameState): void;
}
