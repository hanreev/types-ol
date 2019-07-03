import PluggableMap, { FrameState } from '../PluggableMap';
import EventType from '../render/EventType';
import MapRenderer from './Map';

export default class CompositeMapRenderer extends MapRenderer {
    constructor(map: PluggableMap);
    dispatchRenderEvent(type: EventType, frameState: FrameState): void;
}
