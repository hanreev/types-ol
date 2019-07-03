import Event from '../events/Event';
import { FrameState } from '../PluggableMap';
import { Transform } from '../transform';
import EventType from './EventType';

export default class RenderEvent extends Event {
    constructor(
        type: EventType,
        opt_inversePixelTransform?: Transform,
        opt_frameState?: FrameState,
        opt_context?: CanvasRenderingContext2D
    );
    context: CanvasRenderingContext2D;
    frameState: FrameState;
    inversePixelTransform: Transform;
}
