import Map, { FrameState } from '../Map';
import EventType from '../render/EventType';
import MapRenderer from './Map';

export default class CompositeMapRenderer extends MapRenderer {
    constructor(map: Map);
    dispatchRenderEvent(type: EventType, frameState: FrameState): void;
    /**
     * Render.
     */
    renderFrame(frameState: FrameState): void;
}
