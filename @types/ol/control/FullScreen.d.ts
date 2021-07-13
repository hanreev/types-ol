import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Control from './Control';

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
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'enterfullscreen', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'enterfullscreen', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'enterfullscreen', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'leavefullscreen', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'leavefullscreen', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'leavefullscreen', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
}
