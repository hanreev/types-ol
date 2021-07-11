import PluggableMap from 'ol/PluggableMap';
import { FrameState } from 'ol/PluggableMap';
import Layer from 'ol/layer/Layer';
import { Pixel } from 'ol/pixel';
import EventType from 'ol/render/EventType';
import MapRenderer from 'ol/renderer/Map';
import Source from 'ol/source/Source';

export default class CompositeMapRenderer extends MapRenderer {
    constructor(map: PluggableMap);
    dispatchRenderEvent(type: EventType, frameState: FrameState): void;
    forEachLayerAtPixel<T>(
        pixel: Pixel,
        frameState: FrameState,
        hitTolerance: number,
        callback: (p0: Layer<Source>, p1: Uint8ClampedArray | Uint8Array) => T,
        layerFilter: (p0: Layer<Source>) => boolean,
    ): T | undefined;
    /**
     * Render.
     */
    renderFrame(frameState: FrameState): void;
}
