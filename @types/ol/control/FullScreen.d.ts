import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Control from './Control';

export type TFullScreenBaseEventTypes = 'change' | 'enterfullscreen' | 'error' | 'leavefullscreen';
export type TFullScreenObjectEventTypes = 'propertychange';
export interface Options {
    className?: string;
    label?: string | Text | HTMLElement;
    labelActive?: string | Text | HTMLElement;
    activeClassName?: string;
    inactiveClassName?: string;
    tipLabel?: string;
    keys?: boolean;
    target?: HTMLElement | string;
    source?: HTMLElement | string;
}
declare enum FullScreenEventType {
    ENTERFULLSCREEN = 'enterfullscreen',
    LEAVEFULLSCREEN = 'leavefullscreen',
}
export default class FullScreen extends Control {
    constructor(opt_options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: PluggableMap): void;
    on(type: TFullScreenBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TFullScreenBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TFullScreenBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TFullScreenBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TFullScreenBaseEventTypes | TFullScreenBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TFullScreenObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TFullScreenObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TFullScreenObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TFullScreenObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TFullScreenObjectEventTypes | TFullScreenObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
