import { FrameState } from 'ol/PluggableMap';
import BaseEvent from 'ol/events/Event';
import EventType from 'ol/render/EventType';
import { Transform } from 'ol/transform';

export default class RenderEvent extends BaseEvent {
    constructor(
        type: EventType,
        opt_inversePixelTransform?: Transform,
        opt_frameState?: FrameState,
        opt_context?: CanvasRenderingContext2D,
    );
    /**
     * Canvas context. Not available when the event is dispatched by the map. Only available
     * when a Canvas renderer is used, null otherwise.
     */
    context: CanvasRenderingContext2D | null;
    /**
     * An object representing the current render frame state.
     */
    frameState: FrameState;
    /**
     * Transform from CSS pixels (relative to the top-left corner of the map viewport)
     * to rendered pixels on this event's context. Only available when a Canvas renderer is used, null otherwise.
     */
    inversePixelTransform: Transform;
}
