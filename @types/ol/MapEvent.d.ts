import PluggableMap from 'ol/PluggableMap';
import { FrameState } from 'ol/PluggableMap';
import BaseEvent from 'ol/events/Event';

export default class MapEvent extends BaseEvent {
    constructor(type: string, map: PluggableMap, opt_frameState?: FrameState);
    /**
     * The frame state at the time of the event.
     */
    frameState: FrameState;
    /**
     * The map where the event occurred.
     */
    map: PluggableMap;
}
