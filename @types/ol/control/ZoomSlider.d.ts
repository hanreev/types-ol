import Map from '../Map';
import MapEvent from '../MapEvent';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Control from './Control';

export type TZoomSliderBaseEventTypes = 'change' | 'error';
export type TZoomSliderObjectEventTypes = 'propertychange';
export interface Options {
    className?: string | undefined;
    duration?: number | undefined;
    render?: ((p0: MapEvent) => void) | undefined;
}
export default class ZoomSlider extends Control {
    constructor(options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass null to just remove the control from the current map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: Map | null): void;
    on(type: TZoomSliderBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TZoomSliderBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TZoomSliderBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TZoomSliderBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TZoomSliderBaseEventTypes | TZoomSliderBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TZoomSliderObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TZoomSliderObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TZoomSliderObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TZoomSliderObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TZoomSliderObjectEventTypes | TZoomSliderObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
