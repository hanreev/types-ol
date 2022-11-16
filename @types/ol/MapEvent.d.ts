import Map, { FrameState } from './Map';
import BaseEvent from './events/Event';

export default class MapEvent extends BaseEvent {
    constructor(type: string, map: Map, frameState?: FrameState);
    /**
     * The frame state at the time of the event.
     */
    frameState: FrameState;
    /**
     * The map where the event occurred.
     */
    map: Map;
}
